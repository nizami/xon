export interface Node {
  readonly $: NodeType;
}

export enum NodeType {
  HIDDEN = 'HIDDEN',
  COMMENT = 'COMMENT',
  NL = 'NL',
  WHITESPACE = 'WHITESPACE',
  JOINING = 'JOINING',

  UNKNOWN = 'UNKNOWN',
  STATEMENT = 'STATEMENT',

  ID = 'ID',
  STRING = 'STRING',
  GROUP = 'GROUP',
  INTEGER = 'INTEGER',
  OPERATOR = 'OPERATOR',
  MODIFIER = 'MODIFIER',
  KEYWORD = 'KEYWORD',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  COMMA = 'COMMA',

  BODY = 'BODY',
  INFIX = 'INFIX',
  INVOKE = 'INVOKE',
  POSTFIX = 'POSTFIX',
  PREFIX = 'PREFIX',
  FLOAT = 'FLOAT',
  MEMBER = 'MEMBER',

  DECLARATION = 'DECLARATION',
  IMPORT = 'IMPORT',
  // ID_DECLARATION = 'ID_DECLARATION',
  // FUNCTION_DECLARATION = 'FUNCTION_DECLARATION',
  // LAMBDA_DECLARATION = 'LAMBDA_DECLARATION',

  // DECLARATION = 'DECLARATION',
  // FUNCTION_VALUE_DECLARATION = 'FUNCTION_VALUE_DECLARATION',
  // FUNCTION_BODY_DECLARATION = 'FUNCTION_BODY_DECLARATION',
  // LAMBDA_VALUE_DECLARATION = 'LAMBDA_VALUE_DECLARATION',
  // LAMBDA_BODY_DECLARATION = 'LAMBDA_BODY_DECLARATION',
  TYPE = 'TYPE',
  TYPE_INTEGER = 'TYPE_INTEGER',
  TYPE_STRING = 'TYPE_STRING',
  TYPE_UNION = 'TYPE_UNION',
  TYPE_INTERSECTION = 'TYPE_INTERSECTION',
  VALUE = 'VALUE',
}

export function is<T extends Node = Node>(node: Node | null | undefined, nodeType: NodeType): node is T {
  return node?.$ === nodeType;
}
