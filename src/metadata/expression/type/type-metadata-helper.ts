import { Issue } from '~/issue/issue';
import { IssueLevel } from '~/issue/issue-level';
import { fillParameterMetadata, getShadowParameterMetadata } from '~/metadata/declaration/declaration-metadata-helper';
import { DefinitionMetadata } from '~/metadata/declaration/definition/definition-metadata';
import { ParameterMetadata } from '~/metadata/declaration/parameter/parameter-metadata';
import { DeclarationScope } from '~/metadata/declaration/scope/declaration-scope';
import { ArrayTypeMetadata } from '~/metadata/expression/type/array/array-type-metadata';
import { DefinitionTypeMetadata } from '~/metadata/expression/type/definition/definition-type-metadata';
import { IntersectionTypeMetadata } from '~/metadata/expression/type/intersection/intersection-type-metadata';
import { LiteralTypeMetadata } from '~/metadata/expression/type/literal/literal-type-metadata';
import { MethodTypeMetadata } from '~/metadata/expression/type/method/method-type-metadata';
import { ObjectTypeMetadata } from '~/metadata/expression/type/object/object-type-metadata';
import { ParameterTypeMetadata } from '~/metadata/expression/type/parameter/parameter-type-metadata';
import { TypeMetadata } from '~/metadata/expression/type/type-metadata';
import { UnionTypeMetadata } from '~/metadata/expression/type/union/union-type-metadata';
import { fillValueMetadata } from '~/metadata/expression/value/value-metadata-helper';
import { ArrayExpressionTree } from '~/tree/expression/array/array-expression-tree';
import { ExpressionTree } from '~/tree/expression/expression-tree';
import { GroupExpressionTree } from '~/tree/expression/group/group-expression-tree';
import { IdExpressionTree } from '~/tree/expression/id/id-expression-tree';
import { InfixExpressionTree } from '~/tree/expression/infix/infix-expression-tree';
import { InvokeExpressionTree } from '~/tree/expression/invoke/invoke-expression-tree';
import { LiteralExpressionTree } from '~/tree/expression/literal/literal-expression-tree';
import { MethodExpressionTree } from '~/tree/expression/method/method-expression-tree';
import { FloatLiteralTree } from '~/tree/literal/float/float-literal-tree';
import { IntegerLiteralTree } from '~/tree/literal/integer/integer-literal-tree';
import { StringLiteralTree } from '~/tree/literal/string/string-literal-tree';

export function fillTypeMetadata(tree: ExpressionTree): TypeMetadata | null {
  if (tree instanceof GroupExpressionTree) {
    return fillTypeMetadata(tree.expression);
  }
  if (tree instanceof LiteralExpressionTree) {
    let definition: DefinitionMetadata | null = null;
    if (tree.literal instanceof IntegerLiteralTree) {
      definition = tree.scope.core.integer;
    } else if (tree.literal instanceof FloatLiteralTree) {
      definition = tree.scope.core.float;
    } else if (tree.literal instanceof StringLiteralTree) {
      definition = tree.scope.core.string;
    }
    if (definition) {
      tree.metadata = new LiteralTypeMetadata(tree.literal.value, definition);

      return tree.metadata as TypeMetadata;
    }
  }

  if (tree instanceof IdExpressionTree) {
    const declarations = tree.scope.filter(tree.name.text);
    if (declarations.length === 1) {
      [tree.name.metadata] = declarations;
      if (declarations[0] instanceof ParameterMetadata) {
        tree.metadata = new ParameterTypeMetadata(declarations[0]);

        return tree.metadata as TypeMetadata;
      }
      if (declarations[0] instanceof DefinitionMetadata) {
        tree.metadata = new DefinitionTypeMetadata(declarations[0]);

        return tree.metadata as TypeMetadata;
      }
    } else if (declarations.length > 0) {
      tree.name.addError('Too many declarations');
    } else {
      tree.name.addError('No declarations found');
    }
    tree.metadata = null;

    return tree.metadata;
  }
  if (tree instanceof InfixExpressionTree) {
    const left = fillTypeMetadata(tree.left);
    const right = fillTypeMetadata(tree.right);
    if (tree.name.text === '|' && left && right) {
      tree.metadata = new UnionTypeMetadata(left, right);

      return tree.metadata as TypeMetadata;
    }
    if (tree.name.text === '&' && left && right) {
      tree.metadata = new IntersectionTypeMetadata(left, right);

      return tree.metadata as TypeMetadata;
    }

    throw new Error('Not implemented');
  }

  if (tree instanceof MethodExpressionTree) {
    tree.parameters.forEach((x) => {
      x.metadata = getShadowParameterMetadata(x);
      if (x.name) {
        x.name.metadata = x.metadata;
      }
      tree.scope.add(x.metadata);
      fillParameterMetadata(x, null);
    });
    const result = fillTypeMetadata(tree.value);
    if (!result) return null;

    tree.metadata = new MethodTypeMetadata(
      tree.parameters.map((x) => x.metadata as ParameterMetadata),
      result,
    );

    return tree.metadata as TypeMetadata;
  }

  if (tree instanceof InvokeExpressionTree) {
    if (tree.ctx.arguments().open().OPEN_BRACKET() && tree.instance instanceof IdExpressionTree) {
      const commonType = fillTypeMetadata(tree.instance);
      if (!commonType) return null;

      if (commonType instanceof ParameterTypeMetadata) {
        tree.instance.name.metadata = commonType.parameter;
      } else if (commonType instanceof DefinitionTypeMetadata) {
        tree.instance.name.metadata = commonType.definition;
      }
      tree.metadata = new ArrayTypeMetadata(commonType, [], tree.scope.core.array);

      return tree.metadata as TypeMetadata;
    }
  }

  if (tree instanceof ArrayExpressionTree) {
    if (tree.ctx.arguments().open().OPEN_BRACE()) {
      const objectScope = new DeclarationScope();
      const parameters = tree.arguments.map((x) => {
        if (!x.name) {
          x.addIssue(IssueLevel.error, 'No name argument');
          tree.metadata = null;

          return tree.metadata;
        }
        const metadata = new ParameterMetadata(null);
        metadata.name = x.name.text;
        metadata.sourceSpan = x.sourceSpan;
        metadata.type = (x.value && fillValueMetadata(x.value).type()) ?? null;
        tree.metadata = metadata;

        return tree.metadata as ParameterMetadata;
      });
      parameters.filter((x) => x).forEach((x) => x && objectScope.add(x));
      tree.metadata = new ObjectTypeMetadata(objectScope);

      return tree.metadata as TypeMetadata;
    }
    if (tree.ctx.arguments().open().OPEN_BRACKET()) {
      const items = tree.arguments.map((x) => (x.value && fillTypeMetadata(x.value)) ?? null);
      let commonType: TypeMetadata | null;
      if (items.length === 1) {
        [commonType] = items;
      } else if (items.length > 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        commonType = UnionTypeMetadata.fromTypes(items);
      } else {
        commonType = tree.scope.core.any.type;
      }
      if (commonType) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tree.metadata = new ArrayTypeMetadata(commonType, items, tree.scope.core.array);

        return tree.metadata as TypeMetadata;
      }
    }
    throw new Error('Not implemented');
  }

  Issue.errorFromTree(tree, `Type expression metadata not found for '${tree.constructor.name}'`);
}
