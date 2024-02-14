export enum NodeType {
  NL = 'NL',

  WHITESPACE = 'WHITESPACE',
  JOINING = 'JOINING',

  ROOT = 'ROOT',
  // todo add comments and block comments
  COMMENT = 'COMMENT',

  INTEGER = 'INTEGER',
  FLOAT = 'FLOAT',
  CHAR = 'CHAR',
  STRING = 'STRING',

  OPERATOR = 'OPERATOR',

  ID = 'ID',
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY',
  GROUP = 'GROUP',

  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  COMMA = 'COMMA',

  INVOKE = 'INVOKE',
  INFIX = 'INFIX',
  POSTFIX = 'POSTFIX',
  PREFIX = 'PREFIX',

  UNKNOWN = 'UNKNOWN',
}
