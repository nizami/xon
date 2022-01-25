parser grammar XonParser;

options {
    tokenVocab = XonLexer;
}

source: (statement | NL)*;

statement:
    IMPORT path = expr (':' members += expr (',' members += expr)* ','?)? # importStatement
    | EXPORT path = expr                                                  # exportStatement
    | FOR (value = parameter (',' index = parameter)? IN)? expr body      # forStatement
    | WHILE expr body                                                     # whileStatement
    | DO body WHILE expr                                                  # doWhileStatement
    | IF expr thenBody = body (ELSE elseBody = body)?                     # ifStatement
    | BREAK                                                               # breakStatement
    | RETURN expr?                                                        # returnStatement
    | ACTUAL actual = expr NL+ EXPECT expect = expr                       # assertStatement
    | PREPROCESSOR                                                        # preprocessorStatement
    | MODEL name = id (IS base = id)? definitionBody?                     # modelStatement
    | OBJECT name = id (IS base = id)? definitionBody?                    # objectStatement
    | FACTORY name = id '(' parameters? ')' definitionBody?               # factoryStatement
    | id '=' expr                                                         # assignmentStatement
    | expr                                                                # expressionStatement
    ;

expr:
    id                                                                 # idExpression
    | '[' (arrayItem (',' arrayItem)* ','?)? ']'                       # arrayExpression
    | '{' (parameter (',' parameter)* ','?)? '}'                       # objectExpression
    | instance = expr '(' (args += expr (',' args += expr)* ','?)? ')' # invokeExpression
    | instance = expr '[' (args += expr (',' args += expr)* ','?)? ']' # indexExpression
    | expr '?'                                                         # nullableExpression
    | expr '.' id                                                      # memberExpression
    | '...' expr                                                       # spreadExpression
    | op = ('-' | '+' | NOT) expr                                      # prefixExpression
    | left = expr op = '^' right = expr                                # powExpression
    | left = expr op = ('*' | '/' | '%') right = expr                  # mulDivModExpression
    | left = expr op = ('+' | '-') right = expr                        # addSubExpression
    | left = expr op = '..' right = expr                               # rangeExpression
    | left = expr op = ('<' | '<=' | '>=' | '>') right = expr          # relationalExpression
    | left = expr op = ('==' | '!=') right = expr                      # equalityExpression
    | left = expr op = (IS | AS | IN) right = expr                     # infixExpression
    | left = expr op = AND right = expr                                # andExpression
    | left = expr op = OR right = expr                                 # orExpression
    | literal                                                          # literalExpression
    | '(' (parameter (',' parameter)* ','?)? ')' expr                  # methodExpression
    | '[' (parameter (',' parameter)* ','?)? ']' expr                  # indexerExpression
    | '(' expr ')'                                                     # parenthesizedExpression
    ;

literal:
    INTEGER_LITERAL  # integerLiteral
    | FLOAT_LITERAL  # floatLiteral
    | STRING_LITERAL # stringLiteral
    | REGEX_LITERAL  # regexLiteral
    ;

body:
    ':' statement                             # singleBody
    | ':'? NL INDENT (statement | NL)+ DEDENT # multipleBody
    ;

definitionBody: NL INDENT (parameter | NL)+ DEDENT;
arrayItem:      ( expr ':')? expr;
parameters:     parameter (',' parameter)* ','?;
parameter:      '...'? id expr body | '...'? id expr | '...'? id body | '...'? id;
modifier:       TYPE | CLASS | OBJECT | ENUM | MODEL;
id:             (name = ID | operator) ('<' '|' parameter (',' parameter)* ','? '|' '>')?;
operator:       AS | IS | IN | '^' | '*' | '/' | '%' | '+' | '-' | '<' | '>' | '=';
