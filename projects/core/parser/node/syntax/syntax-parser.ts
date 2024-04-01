import {Array2, Integer, Nothing, nothing} from '../../../lib/core';
import {
  COMMA,
  COMPLEMENT,
  CONTROL_KEYWORDS,
  DIVIDE,
  EQUALS,
  GREAT,
  GREAT_EQUALS,
  INTERSECTION,
  LESS,
  LESS_EQUALS,
  MEMBER,
  META_MEMBER,
  MINUS,
  MOD,
  MODIFIER_KEYWORDS,
  MULTIPLY,
  NOT,
  NOT_EQUALS,
  OPERATOR_KEYWORDS,
  OPTIONAL,
  PLUS,
  PROMISE,
  RANGE,
  REST,
  SQUARE,
  UNION,
} from '../../parser-config';
import {SyntaxContext} from '../../syntax-context';
import {importSyntaxParse} from './import/import-node';
import {infixSyntaxParse} from './infix/infix-node';
import {invokeSyntaxParse} from './invoke/invoke-node';
import {memberSyntaxParse} from './member/member-node';
import {postfixSyntaxParse} from './postfix/postfix-node';
import {prefixSyntaxParse} from './prefix/prefix-node';
import {rangeSyntaxParse} from './range/range-node';
import {SyntaxNode} from './syntax-node';

const parsers: Array2<SyntaxParseFn> = [
  importSyntaxParse,
  memberSyntaxParse([MEMBER, META_MEMBER]),
  invokeSyntaxParse([]),
  prefixSyntaxParse([REST, PLUS, MINUS, NOT]),
  postfixSyntaxParse([OPTIONAL, PROMISE]),
  infixSyntaxParse([SQUARE]),
  infixSyntaxParse([MULTIPLY, DIVIDE, MOD]),
  infixSyntaxParse([PLUS, MINUS]),
  rangeSyntaxParse([RANGE]),
  infixSyntaxParse([LESS, LESS_EQUALS, GREAT_EQUALS, GREAT]),
  infixSyntaxParse([EQUALS, NOT_EQUALS]),
  infixSyntaxParse(OPERATOR_KEYWORDS),
  infixSyntaxParse([INTERSECTION]),
  infixSyntaxParse([UNION, COMPLEMENT]),
  prefixSyntaxParse(MODIFIER_KEYWORDS, false),
  prefixSyntaxParse(CONTROL_KEYWORDS, false),
  infixSyntaxParse([COMMA]),
];

export type SyntaxParseResult = {spliceIndex: Integer; node: SyntaxNode} | Nothing;
export type SyntaxParseFn = (context: SyntaxContext, startIndex: Integer) => SyntaxParseResult;

export function syntaxParse(context: SyntaxContext): Nothing {
  for (const parse of parsers) {
    let result: SyntaxParseResult = nothing;
    let startIndex = 0;

    while ((result = parse(context, startIndex))) {
      startIndex = result.spliceIndex + result.node.children.length - 1;
      context.nodes.splice(result.spliceIndex, result.node.children.length, result.node);
    }
  }
}
