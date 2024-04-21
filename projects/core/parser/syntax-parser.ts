import {formatLastContextHiddenNodes} from '../formatter/formatter';
import {Array2, Boolean2, Integer, Nothing, nothing} from '../lib/core';
import {TextResource} from '../util/resource/text/text-resource';
import {TextResourcePosition, zeroPosition} from '../util/resource/text/text-resource-position';
import {$Node, Node, is} from './node/node';
import {groupNodeParse} from './node/syntax/group/group-node-parse';
import {charNodeParse} from './node/token/char/char-node-parse';
import {closeNodeParse} from './node/token/close/close-node-parse';
import {commentBlockNodeParse} from './node/token/comment-block/comment-block-node-parse';
import {commentLineNodeParse} from './node/token/comment-line/comment-line-node-parse';
import {idNodeParse} from './node/token/id/id-node-parse';
import {integerNodeParse} from './node/token/integer/integer-node-parse';
import {joiningNodeParse} from './node/token/joining/joining-node-parse';
import {NlNode} from './node/token/nl/nl-node';
import {nlNodeParse} from './node/token/nl/nl-node-parse';
import {operatorNodeParse} from './node/token/operator/operator-node-parse';
import {stringNodeParse} from './node/token/string/string-node-parse';
import {isHiddenToken} from './node/token/token-node';
import {unknownNodeParse} from './node/token/unknown/unknown-node-parse';
import {whitespaceNodeParse} from './node/token/whitespace/whitespace-node-parse';
import {SyntaxContext, SyntaxResult, syntaxContext} from './syntax-context';
import {putStatementNode} from './util/put-statement-node';

export type TokenParseResult = Node | Nothing;
export type TokenParseFn = (context: SyntaxContext, index: Integer) => TokenParseResult;

const parsers: Array2<TokenParseFn> = [
  commentBlockNodeParse,
  commentLineNodeParse,
  integerNodeParse,
  stringNodeParse,
  charNodeParse,
  nlNodeParse,
  closeNodeParse,
  joiningNodeParse,
  whitespaceNodeParse,
  operatorNodeParse,
  idNodeParse,
  groupNodeParse,
];

export function syntaxParse(resource: TextResource): SyntaxResult {
  return syntaxParseUntil(resource, zeroPosition(), nothing);
}

export function syntaxParseUntil(
  resource: TextResource,
  startPosition: TextResourcePosition,
  breakOnNodeFn: ((node: Node) => Boolean2) | Nothing,
): SyntaxResult {
  const context = syntaxContext(resource, startPosition);

  while (context.position.index < context.resource.data.length) {
    const node = nextNode(context);
    context.position = node.range.stop;

    if (breakOnNodeFn && breakOnNodeFn(node)) {
      context.breakNode = node;

      break;
    }

    if (is<NlNode>(node, $Node.NL) && context.nodes.length > 0) {
      putStatementNode(context);

      context.hiddenNodes.push(node);
      context.nodes = [];

      continue;
    }

    const lastNode = context.nodes.last();
    if (isHiddenToken(node)) {
      const hiddenNodes = lastNode?.hiddenNodes ?? context.hiddenNodes;
      hiddenNodes.push(node);

      continue;
    }

    context.nodes.push(node);
  }

  if (context.nodes.length > 0) {
    putStatementNode(context);
  }

  // todo try to use EOF node to format as the last one
  const formatter = formatLastContextHiddenNodes(context);

  if (formatter) {
    context.formatterManager.addFormatter(formatter);
  }

  return {
    ...context,
    syntaxContext: context,
  };
}

function nextNode(context: SyntaxContext): Node {
  return (
    parsers.findMap((parse) => parse(context, context.position.index)) ??
    unknownNodeParse(context, context.position.index)
  );
}
