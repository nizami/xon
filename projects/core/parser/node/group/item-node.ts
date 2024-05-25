import {Nothing} from '../../../../lib/types';
import {formatChildNode} from '../../../formatter/formatter';
import {ISSUE_MESSAGE} from '../../../issue/issue-message';
import {rangeFromNodes} from '../../../util/resource/text/text-range';
import {SyntaxContext} from '../../syntax-context';
import {$Node, Node} from '../node';
import {StatementNode} from '../statement/statement-node';
import {SyntaxNode} from '../syntax/syntax-node';
import {CommaNode} from '../token/comma/comma-node';

export type ItemNode = SyntaxNode<$Node.ITEM> & {
  value: Node | Nothing;
  statements: StatementNode[];
  comma: CommaNode | Nothing;
};

export function itemNode(context: SyntaxContext, statements: StatementNode[], comma: CommaNode | Nothing): ItemNode {
  const children = comma ? [...statements, comma] : [...statements];

  const node: ItemNode = {
    $: $Node.ITEM,
    range: rangeFromNodes(children),
    children,
    value: statements.first()?.value,
    statements,
    comma,
  };

  validate(context, node);
  format(context, node);

  return node;
}

function validate(context: SyntaxContext, node: ItemNode): Nothing {
  if (!node.value) {
    context.issueManager.addError(node.range, ISSUE_MESSAGE.unexpectedExpression());
  }
}

function format(context: SyntaxContext, node: ItemNode): Nothing {
  if (node.comma) {
    formatChildNode(context, node.comma, false);
  }
}
