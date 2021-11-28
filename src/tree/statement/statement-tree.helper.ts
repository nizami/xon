import {
  AssertStatementContext,
  AttributeStatementContext,
  BodyContext,
  ExpressionStatementContext,
  ForStatementContext,
  IfStatementContext,
  PreprocessorStatementContext,
  ReturnStatementContext,
  StatementContext,
  WhileStatementContext,
} from '../../grammar/xon-parser';
import { AssertStatementTree } from './assert-statement/assert-statement.tree';
import { AttributeStatementTree } from './attribute-statement/attribute-statement.tree';
import { ExpressionStatementTree } from './expression-statement/expression-statement.tree';
import { ForStatementTree } from './for-statement/for-statement.tree';
import { IfStatementTree } from './if-statement/if-statement.tree';
import { PreprocessorStatementTree } from './preprocessor-statement/preprocessor-statement.tree';
import { ReturnStatementTree } from './return-statement/return-statement.tree';
import { StatementTree } from './statement.tree';
import { WhileStatementTree } from './while-statement/while-statement.tree';

export const getStatementTree = (ctx: StatementContext): StatementTree => {
  if (ctx === undefined) return undefined;

  if (ctx instanceof AssertStatementContext) return new AssertStatementTree(ctx);
  if (ctx instanceof ExpressionStatementContext) return new ExpressionStatementTree(ctx);
  if (ctx instanceof ForStatementContext) return new ForStatementTree(ctx);
  if (ctx instanceof IfStatementContext) return new IfStatementTree(ctx);
  if (ctx instanceof PreprocessorStatementContext) return new PreprocessorStatementTree(ctx);
  if (ctx instanceof ReturnStatementContext) return new ReturnStatementTree(ctx);
  if (ctx instanceof AttributeStatementContext) return new AttributeStatementTree(ctx);
  if (ctx instanceof WhileStatementContext) return new WhileStatementTree(ctx);

  throw Error(`Statement tree not found for "${ctx.constructor.name}"`);
};

export const getStatementsTrees = (statements: StatementContext[]): StatementTree[] => {
  if (!statements) return undefined;
  return statements.map(getStatementTree);
};

export const getStatementsFromBody = (body: BodyContext): StatementTree[] => {
  return getStatementsTrees(body.statement());
};
