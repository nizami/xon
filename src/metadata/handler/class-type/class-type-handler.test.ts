import { ClassDefinitionTree } from '../../../tree/definition/class-definition/class-definition-tree';
import { parseDefinition } from '../../../tree/parse';
import { FunctionTypeMetadata } from '../../type/function-type/function-type-metadata';
import { ClassTypeHandler } from './class-type-handler';

test('class type', () => {
  const code = 'A:\n  p: 123';
  const tree = parseDefinition<ClassDefinitionTree>(code);
  expect(tree).toBeInstanceOf(ClassDefinitionTree);

  const handler = new ClassTypeHandler();
  handler.handle(tree);

  expect(tree.typeMetadata).toBeInstanceOf(FunctionTypeMetadata);

  // expect(classTypeMetadata.name).toBe('A');
  // expect(classTypeMetadata.properties.length).toBe(1);
  // expect(classTypeMetadata.properties[0].name).toBe('p');
  // expect(classTypeMetadata.properties[0].type.name).toBe('Integer');
});
