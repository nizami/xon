import {
  $DeclarationNode,
  Node,
  StatementNode,
  SyntaxAnalyzer,
  SyntaxNode,
  isTypeDeclarationNode,
} from '#analyzer';
import {ArrayData, Integer, Nothing, newArrayData, nothing} from '#common';
import {is} from '#typing';

export type SyntaxParseResult = {index: Integer; deleteCount?: Integer; node: SyntaxNode} | Nothing;
export type SyntaxParseFn = (
  analyzer: SyntaxAnalyzer,
  nodes: ArrayData<Node>,
  startIndex: Integer,
  parentStatement: StatementNode | Nothing,
) => SyntaxParseResult;

const parsers: ArrayData<{min: Integer; parse: SyntaxParseFn}> = newArrayData([
  // {min: 2, parse: importNodeParse(IMPORT, false)},
  // {min: 2, parse: memberNodeParse(newArrayData([MEMBER, META_MEMBER]))},
  // {min: 2, parse: invokeNodeParse()},
  // {min: 2, parse: prefixNodeParse(newArrayData([REST, PLUS, MINUS, PLUS, NOT]), true)},
  // {min: 2, parse: postfixNodeParse(newArrayData([OPTIONAL, PROMISE]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([POW]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([MULTIPLY, DIVIDE, MOD]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([PLUS, MINUS]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([RANGE]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([LESS, LESS_EQUALS, GREAT_EQUALS, GREAT]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([EQUALS, NOT_EQUALS]), true)},
  // {min: 3, parse: infixNodeParse(OPERATOR_KEYWORDS, true)},
  // {min: 3, parse: infixNodeParse(newArrayData([INTERSECTION]), true)},
  // {min: 3, parse: infixNodeParse(newArrayData([UNION, COMPLEMENT]), true)},
  // {min: 2, parse: prefixNodeParse(MODIFIER_KEYWORDS, false)},
  // {min: 2, parse: returnNodeParse(RETURN, false)},
  // // todo remove and use another node than 'prefixNodeParse' for 'CONTROL_KEYWORDS'
  // {min: 2, parse: prefixNodeParse(CONTROL_KEYWORDS, false)},
  // {min: 1, parse: lambdaNodeParse()},
  // {min: 1, parse: declarationNodeParse()},
  // {min: 3, parse: assignmentNodeParse()},
]);

export function statementNodeCollapse(
  analyzer: SyntaxAnalyzer,
  parentStatement: StatementNode | Nothing,
  nodes: ArrayData<Node>,
): void {
  if (nodes.isEmpty()) {
    return;
  }

  let result: SyntaxParseResult = nothing;

  for (const {min, parse} of parsers) {
    if (nodes.count() < min) {
      continue;
    }

    let index = 0;

    while ((result = parse(analyzer, nodes, index, parentStatement))) {
      const deleteCount = result.deleteCount ?? result.node.children.count();
      // todo fix 'nodes._items'
      nodes._items.splice(result.index, deleteCount, result.node);
      index = result.index + 1;

      validate(analyzer, parentStatement, result.node);

      if (index >= nodes.count() || nodes.count() < min) {
        break;
      }
    }
  }
}

function validate(analyzer: SyntaxAnalyzer, parentStatement: StatementNode | Nothing, node: Node): void {
  const parentDeclaration = parentStatement?.value;

  if (isTypeDeclarationNode(parentDeclaration)) {
    if (parentDeclaration.assign?.value) {
      analyzer.diagnosticManager.addPredefinedDiagnostic(node.reference, (x) => x.shouldNotBeBody());

      return;
    }

    if (!is(node, $DeclarationNode)) {
      analyzer.diagnosticManager.addPredefinedDiagnostic(node.reference, (x) =>
        x.shouldBeDeclarationStatement(),
      );

      return;
    }

    if (!parentDeclaration.attributes) {
      parentDeclaration.attributes = newArrayData();
    }

    parentDeclaration.attributes.addLastItem(node);
  }
}
