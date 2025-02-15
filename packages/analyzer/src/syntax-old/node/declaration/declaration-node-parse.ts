import {
  $AngleGroupNode,
  $DeclarationNode,
  $DocumentationNode,
  $IdNode,
  $InvokeNode,
  $OperatorNode,
  $ParenGroupNode,
  $PrefixNode,
  ASSIGN,
  AssignNode,
  assignNode,
  COLON,
  DeclarationNode,
  DocumentationNode,
  GroupNode,
  IdNode,
  Node,
  nodeFindMap,
  OperatorNode,
  partialToDeclaration,
  StatementNode,
  SyntaxAnalyzer,
  SyntaxParseFn,
  TYPE,
  TYPE_KEYWORDS,
  TypeNode,
  typeNode,
} from '#analyzer';
import {ArrayData, Integer, newArrayData, Nothing, nothing} from '#common';
import {is} from '#typing';

export function declarationNodeParse(): SyntaxParseFn {
  return (
    analyzer: SyntaxAnalyzer,
    nodes: ArrayData<Node>,
    _startIndex: Integer,
    parentStatement: StatementNode | Nothing,
  ) => {
    if (is(nodes.first(), $DeclarationNode())) {
      return nothing;
    }

    const parts = getDeclarationParts(analyzer, nodes, parentStatement);

    if (!parts) {
      return nothing;
    }

    if (parts.modifier) {
      parts.modifier.hiddenNodes = parts.modifierHiddenNodes ?? newArrayData();
    }

    if (parts.id) {
      parts.id.hiddenNodes = parts.idHiddenNodes ?? newArrayData();
    }

    return {
      index: parts.spliceIndex,
      deleteCount: parts.deleteCount,
      node: partialToDeclaration(analyzer, parts),
    };
  };
}

function getDeclarationParts(
  analyzer: SyntaxAnalyzer,
  nodes: ArrayData<Node>,
  parentStatement: StatementNode | Nothing,
):
  | {
      spliceIndex: Integer;
      deleteCount: Integer;
      modifierHiddenNodes?: ArrayData<Node> | Nothing;
      modifier?: OperatorNode | Nothing;
      idHiddenNodes?: ArrayData<Node> | Nothing;
      id: IdNode;
      generics?: GroupNode | Nothing;
      parameters?: GroupNode | Nothing;
      type?: TypeNode | Nothing;
      assign?: AssignNode | Nothing;
    }
  | Nothing {
  const header = getHeader(analyzer, nodes.at(0));

  if (!header) {
    return nothing;
  }

  const typeOperatorFound = nodeFindMap(nodes, 0, true, (node, index, nodes) => {
    if (
      index - 1 === 0 &&
      is(node, $OperatorNode()) &&
      node.text.equals(COLON) &&
      nodes.at2(index + 1).isExpression
    ) {
      return {node, index};
    }

    return nothing;
  });

  if (typeOperatorFound) {
    const typeValue = nodes.at2(typeOperatorFound.index + 1);
    const assignOperator = nodes.at2(typeOperatorFound.index + 2);
    const assignValue = nodes.at2(typeOperatorFound.index + 3);

    const type = typeNode(analyzer, typeOperatorFound.node, typeValue);

    if (is(assignOperator, $OperatorNode()) && assignOperator.text.equals(ASSIGN) && assignValue.isExpression) {
      const assign = assignNode(analyzer, assignOperator, assignValue);

      return {spliceIndex: typeOperatorFound.index - 1, deleteCount: 5, ...header, type, assign};
    }

    return {spliceIndex: typeOperatorFound.index - 1, deleteCount: 3, ...header, type};
  }

  if (!header.modifier && !isTypeDeclarationNode(parentStatement?.value)) {
    return nothing;
  }

  const assignOperatorFound = nodeFindMap(nodes, 0, true, (node, index, nodes) => {
    if (
      index - 1 === 0 &&
      is(node, $OperatorNode()) &&
      node.text.equals(ASSIGN) &&
      nodes.at2(index + 1).isExpression
    ) {
      return {node, index};
    }

    return nothing;
  });

  if (assignOperatorFound) {
    const assignValue = nodes.at2(assignOperatorFound.index + 1);
    const assign = assignNode(analyzer, assignOperatorFound.node, assignValue);

    return {spliceIndex: assignOperatorFound.index - 1, deleteCount: 3, ...header, assign};
  }

  return {spliceIndex: 0, deleteCount: 1, ...header};
}

function getHeader(
  analyzer: SyntaxAnalyzer,
  node: Node | Nothing,
):
  | {
      modifierHiddenNodes?: ArrayData<Node> | Nothing;
      documentation?: DocumentationNode | Nothing;
      modifier?: OperatorNode | Nothing;
      idHiddenNodes?: ArrayData<Node> | Nothing;
      id: IdNode;
      generics?: GroupNode | Nothing;
      parameters?: GroupNode | Nothing;
    }
  | Nothing {
  const documentation = node?.hiddenNodes?.last<DocumentationNode>((x) => is(x, $DocumentationNode()));

  if (is(node, $PrefixNode()) && TYPE_KEYWORDS.hasItem(node.operator.text)) {
    const underModifier = getUnderModifier(analyzer, node.value);

    if (!underModifier) {
      return nothing;
    }

    return {
      modifierHiddenNodes: node.hiddenNodes,
      documentation,
      modifier: node.operator,
      ...underModifier,
    };
  }

  const underModifier = getUnderModifier(analyzer, node);

  return underModifier ? {documentation, ...underModifier} : nothing;
}

function getUnderModifier(
  analyzer: SyntaxAnalyzer,
  node: Node | Nothing,
):
  | {
      idHiddenNodes?: ArrayData<Node> | Nothing;
      id: IdNode;
      generics?: GroupNode | Nothing;
      parameters?: GroupNode | Nothing;
    }
  | Nothing {
  if (!node) {
    return nothing;
  }

  if (is(node, $IdNode())) {
    return {idHiddenNodes: node.hiddenNodes, id: node};
  }

  if (is(node, $InvokeNode())) {
    if (
      is(node.instance, $InvokeNode()) &&
      is(node.instance.instance, $IdNode()) &&
      is(node.instance.group, $AngleGroupNode()) &&
      is(node.group, $ParenGroupNode())
    ) {
      parseDeclarations(analyzer, node.instance.group);
      parseDeclarations(analyzer, node.group);

      return {
        idHiddenNodes: node.hiddenNodes,
        id: node.instance.instance,
        generics: node.instance.group,
        parameters: node.group,
      };
    }

    if (is(node.instance, $IdNode())) {
      parseDeclarations(analyzer, node.group);

      if (is(node.group, $AngleGroupNode())) {
        return {idHiddenNodes: node.hiddenNodes, id: node.instance, generics: node.group};
      }

      if (is(node.group, $ParenGroupNode())) {
        return {idHiddenNodes: node.hiddenNodes, id: node.instance, parameters: node.group};
      }
    }
  }

  return nothing;
}

function parseDeclarations(analyzer: SyntaxAnalyzer, group: GroupNode): void {
  for (const item of group.items) {
    if (is(item.value, $IdNode())) {
      item.value = partialToDeclaration(analyzer, {id: item.value});
    }
  }
}

export function isTypeDeclarationNode(declarationNode: Node | Nothing): declarationNode is DeclarationNode {
  if (
    is(declarationNode, $DeclarationNode()) &&
    declarationNode.modifier?.text &&
    declarationNode.modifier.text.equals(TYPE)
  ) {
    return true;
  }

  return false;
}
