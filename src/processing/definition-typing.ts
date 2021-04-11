/* eslint-disable no-param-reassign */
import { DefinitionTree } from '../tree/definition/definition.tree';
import { createFunctionType } from '../tree/type/type-helper';
import { processExpression } from './expression-typing';
import {
  processIndexMember,
  processInitMember,
  processMethodMember,
  processOperatorMember,
} from './member-typing';
import { addToScope, popScope, pushScope } from './typing';

export function processDefinition(tree: DefinitionTree): void {
  pushScope();
  tree.indexes.forEach((x) => {
    const type = createFunctionType([], [x.parameter.dataType], x.returnType);
    addToScope(x.name, type);
  });
  tree.operators.forEach((x) => {
    const type = createFunctionType(
      [],
      x.parameters.map((z) => z.dataType),
      x.returnType,
    );
    addToScope(x.name, type);
  });
  tree.methods.forEach((x) => {
    const type = createFunctionType(
      [],
      x.parameters.map((z) => z.dataType),
      x.returnType,
    );
    addToScope(x.name, type);
  });
  tree.properties.forEach((x) => {
    processExpression(x.value);

    addToScope(x.name, x.dataType || x.value.dataType);
  });
  tree.inits.forEach(processInitMember);
  tree.indexes.forEach(processIndexMember);
  tree.operators.forEach(processOperatorMember);
  tree.methods.forEach(processMethodMember);
  popScope();
}
