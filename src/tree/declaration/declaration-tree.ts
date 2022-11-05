import { DeclarationContext } from '@/grammar/xon-parser';
import { IssueLevel } from '@/issue/issue-level';
import { Boolean2 } from '@/lib/core';
import { DeclarationMetadata } from '@/metadata/declaration/declaration-metadata';
import { getDeclarationTrees } from '@/tree/declaration/declaration-tree-helper';
import { ExpressionTree } from '@/tree/expression/expression-tree';
import { getExpressionTree } from '@/tree/expression/expression-tree-helper';
import { IdExpressionTree } from '@/tree/expression/id/id-expression-tree';
import { IdTree } from '@/tree/id/id-tree';
import { getIdTree } from '@/tree/id/id-tree-helper';
import { SourceTree } from '@/tree/source/source-tree';
import { getSourceTree } from '@/tree/source/source-tree-helper';
import { CommentStatementTree } from '@/tree/statement/comment/comment-statement-tree';
import { DeclarationStatementTree } from '@/tree/statement/declaration/declaration-statement-tree';
import { ExpressionStatementTree } from '@/tree/statement/expression/expression-statement-tree';
import { Tree } from '@/tree/tree';
import { SourceRange } from '@/util/source-range';

export class DeclarationTree extends Tree {
  ctx: DeclarationContext;
  metadata: DeclarationMetadata;
  sourceRange: SourceRange;
  modifier?: IdTree | null;
  name?: IdTree;
  destructure: DeclarationTree[];
  hasParameters: Boolean2;
  generics: DeclarationTree[];
  parameters: DeclarationTree[];
  type?: ExpressionTree | null;
  value?: ExpressionTree | null;
  body?: SourceTree | null;
  attributes: (DeclarationStatementTree | ExpressionStatementTree)[];

  constructor(ctx: DeclarationContext) {
    super();

    this.ctx = ctx;
    this.sourceRange = SourceRange.fromContext(ctx);
    this.modifier = getIdTree(ctx._modifier);
    this.name = getIdTree(ctx._name);
    this.destructure = getDeclarationTrees(ctx._destructure?.declaration());
    this.hasParameters = ctx._params.filter((x) => !x.open().LESS()).length > 0;
    this.generics = getDeclarationTrees(
      ctx._params.filter((x) => x.open().LESS())[0]?.declaration(),
    );
    this.parameters = getDeclarationTrees(
      ctx._params.filter((x) => !x.open().LESS())[0]?.declaration(),
    );
    this.type = getExpressionTree(ctx.valueType()?.expression());
    this.value = getExpressionTree(ctx.valueBody()?.expression());
    this.body = getSourceTree(ctx.valueBody()?.body()?.source());

    this.body = getSourceTree(ctx.valueBody()?.body()?.source());
    const statements = this.body?.statements || [];
    statements
      .filter(
        (x) =>
          !(
            x instanceof DeclarationStatementTree ||
            x instanceof CommentStatementTree ||
            (x instanceof ExpressionStatementTree && x.expression instanceof IdExpressionTree)
          ),
      )
      .forEach((x) =>
        x.addIssue(IssueLevel.error, 'Definition body should contain only parameters'),
      );
    this.attributes = statements
      .filter(
        (x) =>
          x instanceof DeclarationStatementTree ||
          (x instanceof ExpressionStatementTree && x.expression instanceof IdExpressionTree),
      )
      .map((x) => x as DeclarationStatementTree | ExpressionStatementTree);

    this.addChildren(
      this.modifier,
      this.name,
      ...this.destructure,
      ...this.generics,
      ...this.parameters,
      this.type,
      this.value,
      this.body,
    );
  }
}
