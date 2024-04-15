import {ISSUE_MESSAGE} from '../../issue/issue-message';
import {Array2, Integer, Nothing} from '../../lib/core';
import {StatementNode, statementNode} from '../node/syntax/statement/statement-node';
import {TokenNode} from '../node/token/token-node';
import {statementCollapse} from './statement-collapse';

import {SyntaxContext} from '../syntax-context';
// import {parseDeclarationStatement} from './collapse-declaration';

export function getStatementNode(
  context: SyntaxContext,
  parent: StatementNode | Nothing,
  indentStopColumn: Integer,
  beforeIndentHiddenNodes: Array2<TokenNode>,
  indentHiddenNodes: Array2<TokenNode>,
): StatementNode {
  statementCollapse(context);
  // const declaration = parseDeclarationStatement(context, context.nodes[0]);

  // if (declaration) {
  //   context.nodes[0] = declaration;
  // }

  context.nodes
    .slice(1)
    .forEach((node) => context.issueManager.addError(node.range, ISSUE_MESSAGE.unexpectedExpression()));

  return statementNode(context, context.nodes, parent, indentStopColumn, beforeIndentHiddenNodes, indentHiddenNodes);
}
