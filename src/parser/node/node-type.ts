export enum NodeType {
  ROOT = 'ROOT',

  HIDDEN = 'HIDDEN',
  COMMENT = 'COMMENT',
  NL = 'NL',
  WHITESPACE = 'WHITESPACE',
  JOINING = 'JOINING',

  UNKNOWN = 'UNKNOWN',
  STATEMENT = 'STATEMENT',

  ID = 'ID',
  INTEGER = 'INTEGER',
  CHAR = 'CHAR',
  STRING = 'STRING',
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY',
  GROUP = 'GROUP',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  OPERATOR = 'OPERATOR',
  MODIFIER = 'MODIFIER',
  KEYWORD = 'KEYWORD',
  COMMA = 'COMMA',

  BODY = 'BODY',
  INFIX = 'INFIX',
  INVOKE = 'INVOKE',
  POSTFIX = 'POSTFIX',
  PREFIX = 'PREFIX',
  FLOAT = 'FLOAT',
  MEMBER = 'MEMBER',
  META_MEMBER = 'META_MEMBER',

  DECLARATION = 'DECLARATION',
  MODEL = 'MODEL',
  ATTRIBUTE = 'ATTRIBUTE',
  PARAMETERS = 'PARAMETERS',
  PARAMETER = 'PARAMETER',
  ARGUMENTS = 'ARGUMENTS',
  ARGUMENT = 'ARGUMENT',
  IMPORT = 'IMPORT',
  // ID_DECLARATION = 'ID_DECLARATION',
  // FUNCTION_DECLARATION = 'FUNCTION_DECLARATION',
  // LAMBDA_DECLARATION = 'LAMBDA_DECLARATION',
  // DECLARATION = 'DECLARATION',
  // FUNCTION_VALUE_DECLARATION = 'FUNCTION_VALUE_DECLARATION',
  // FUNCTION_BODY_DECLARATION = 'FUNCTION_BODY_DECLARATION',
  // LAMBDA_VALUE_DECLARATION = 'LAMBDA_VALUE_DECLARATION',
  // LAMBDA_BODY_DECLARATION = 'LAMBDA_BODY_DECLARATION',
  ASSIGN = 'ASSIGN',
  ID_ASSIGN = 'ID_ASSIGN',
  OBJECT_ASSIGN = 'OBJECT_ASSIGN',
  ARRAY_ASSIGN = 'ARRAY_ASSIGN',
  VALUE = 'VALUE',
  TYPE = 'TYPE',
  TYPE_INTEGER = 'TYPE_INTEGER',
  TYPE_STRING = 'TYPE_STRING',
  TYPE_UNION = 'TYPE_UNION',
  TYPE_INTERSECTION = 'TYPE_INTERSECTION',
}
