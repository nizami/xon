import {newArrayData, nothing} from '#common';
import {
  $DeclarationNode,
  $ImportNode,
  $ReturnNode,
  SemanticAnalyzer,
  StatementNode,
  importValueSemanticParse,
  returnStatementSemanticParse,
  statementDeclarationsParse,
  valueSemanticParse,
} from '#core';
import {is} from '#typing';

export function statementsParse(analyzer: SemanticAnalyzer, statements: StatementNode[]): void {
  if (statements.length === 0) {
    return;
  }

  for (const statement of statements) {
    if (is(statement.value, $ImportNode)) {
      importValueSemanticParse(analyzer, statement.value);
    }
  }

  const declarationNodes = newArrayData(statements).filterMap((x) =>
    is(x.value, $DeclarationNode) ? x.value : nothing,
  );
  statementDeclarationsParse(analyzer, declarationNodes.toNativeArray());

  for (const statement of statements) {
    for (const node of statement.children) {
      if (is(node, $ImportNode)) {
        continue;
      }

      if (is(node, $ReturnNode)) {
        returnStatementSemanticParse(analyzer, node);

        continue;
      }

      valueSemanticParse(analyzer, node);
    }
  }

  // todo fix it if needed
  analyzer.pushDeclarationScope();

  for (const statement of statements) {
    statementsParse(analyzer, statement.body);
  }

  analyzer.popDeclarationScope();
}
