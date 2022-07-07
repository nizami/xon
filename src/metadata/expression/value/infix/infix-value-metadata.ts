import { Any, None, none, Unknown } from '../../../../lib/core';
import { InfixExpressionTree } from '../../../../tree/expression/infix/infix-expression-tree';
import { ParameterMetadata } from '../../../declaration/parameter/parameter-metadata';
import { DeclarationScope } from '../../../declaration/scope/declaration-scope';
import { MethodTypeMetadata } from '../../type/method/method-type-metadata';
import { TypeMetadata } from '../../type/type-metadata';
import { ValueMetadata } from '../value-metadata';
import { getValueMetadata } from '../value-metadata-helper';

export class InfixValueMetadata extends ValueMetadata {
  constructor(private tree: InfixExpressionTree, private scope: DeclarationScope) {
    super();
    tree.left.metadata = getValueMetadata(tree.left, scope);
    tree.right.metadata = getValueMetadata(tree.right, scope);
  }

  operatorDeclaration(): ParameterMetadata | None {
    const declarations = this.scope.filter(this.tree.name.text, (x) => {
      const leftMetadata = this.tree.left.metadata;
      const rightMetadata = this.tree.right.metadata;

      if (!(leftMetadata instanceof ValueMetadata && rightMetadata instanceof ValueMetadata)) {
        throw new Error('Not implemented');
      }

      if (!(x instanceof ParameterMetadata)) return false;

      const type = x.type;
      if (!(type instanceof MethodTypeMetadata)) return false;

      const parameters = type.parameters;
      if (parameters.length !== 2) return false;

      const [left, right] = parameters;
      return leftMetadata.type().is(left.type) && rightMetadata.type().is(right.type);
    });

    if (declarations.length === 1) {
      return declarations[0] as ParameterMetadata;
    }
    if (declarations.length > 0) {
      this.tree.name.addError('Too many declarations');
    } else {
      this.tree.name.addError('No declarations found');
    }
    return none;
  }

  type(): TypeMetadata | None {
    const operatorDeclarationType = this.operatorDeclaration()?.type;
    if (operatorDeclarationType instanceof MethodTypeMetadata) {
      return operatorDeclarationType.resultType;
    }
    return none;
  }

  eval(): Any {
    const leftMetadata = this.tree.left.metadata;
    const rightMetadata = this.tree.right.metadata;

    if (leftMetadata instanceof ValueMetadata && rightMetadata instanceof ValueMetadata) {
      const left = leftMetadata.eval();
      const right = rightMetadata.eval();
      if (this.tree.name.text === '^') {
        return Math.pow(left, right);
      }
      const escapeIfString = (s: Unknown) => (typeof s === 'string' && `\`${s}\``) || s;
      return eval(`${escapeIfString(left)} ${this.tree.name} ${escapeIfString(right)}`);
    }
    throw new Error('Not implemented');
  }
}
