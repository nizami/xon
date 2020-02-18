lexer grammar XonLexer
    ;

channels {
    ERROR
}

options {
    superClass = XonLexerBase;
}

tokens {
    INDENT,
    DEDENT
}

@lexer::header { 
import { XonLexerBase } from "./xon-lexer-base";
}

// PrimitiveDataType : 'i8' | 'i16' | 'i32' | 'i64' | 'i128' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'bool' | 'char' | 'str' ;
Class:    'class';
Enum:     'enum';
Scheme:   'scheme';
If:       'if';
Else:     'else';
Loop:     'loop';
In:       'in';
Continue: 'continue';
Break:    'break';
Return:   'return';
As:       'as';
Var:      'var';

Preprocessor: '#:' ~[\r\n]+;
LineBreak:    ({this.atStartOfInput()}? SPACES | ( '\r'? '\n' | '\r') SPACES?) {this.handleLineBreak()};

// Bitwise operations
BitAnd:               'and';
BitOr:                'or';
BitXor:               'xor';
RightShiftArithmetic: '>>';
LeftShiftArithmetic:  '<<';
RightShiftLogical:    '>>>';

OpenBracket:                '[' {this.opened++;};
CloseBracket:               ']' {this.opened--;};
OpenParen:                  '(' {this.opened++;};
CloseParen:                 ')' {this.opened--;};
OpenBrace:                  '{' {this.opened++;};
CloseBrace:                 '}' {this.opened--;};
Comma:                      ',';
Assign:                     '=';
QuestionMark:               '?';
Colon:                      ':';
TwoColon:                   '::';
Ellipsis:                   '...';
Dot:                        '.';
Plus:                       '+';
Minus:                      '-';
BitNot:                     '~';
Not:                        '!';
Multiply:                   '*';
Divide:                     '/';
Modulus:                    '%';
Pow:                        '^';
Sharp:                      '#';
LessThan:                   '<';
MoreThan:                   '>';
LessThanEquals:             '<=';
MoreThanEquals:             '>=';
Equals:                     '==';
NotEquals:                  '!=';
And:                        '&&';
Or:                         '||';
MultiplyAssign:             '*=';
DivideAssign:               '/=';
ModulusAssign:              '%=';
PlusAssign:                 '+=';
MinusAssign:                '-=';
LeftShiftArithmeticAssign:  '<<=';
RightShiftArithmeticAssign: '>>=';
RightShiftLogicalAssign:    '>>>=';
BitAndAssign:               '&=';
BitXorAssign:               '^=';
BitOrAssign:                '|=';
LambdaStart:                '\\';
Pipe:                       '|';
Underscore:                 '_';

NullLiteral:    'null';
BooleanLiteral: 'true' | 'false';
DecimalLiteral: DECIMAL_NUMBER;
FloatLiteral:   DECIMAL_NUMBER '.' DECIMAL_NUMBER;
StringLiteral:  '\'' ~[']* '\'';

StringFormat: 'f\'' ~[']* '\'';
ID:           [a-zA-Z] [a-zA-Z0-9_]* | [a-zA-Z_] [a-zA-Z0-9_]+;
// LineBreak:    '\n';

// Documentation: '_' .*? '_';

Skip:                ( SPACES | SINGLE_LINE_COMMENT | MULTI_LINE_COMMENT | LINE_JOINING) -> skip;
UnexpectedCharacter: .                                                                   -> channel(ERROR);

fragment SPACES:              [ \t]+;
fragment MULTI_LINE_COMMENT:  '/*' .*? '*/';
fragment SINGLE_LINE_COMMENT: '//' ~[\r\n]*;
fragment LINE_JOINING:        '\\' SPACES? ( '\r'? '\n' | '\r');
fragment DECIMAL_NUMBER:      DECIMAL_DIGIT+ ('_' DECIMAL_DIGIT+)*;
fragment DECIMAL_DIGIT:       [0-9];