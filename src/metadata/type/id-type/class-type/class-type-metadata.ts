import { ClassDefinitionTree } from '../../../../tree/definition/class-definition/class-definition-tree';
import { SourceReference } from '../../../../tree/source-reference';
import { TypeMetadata } from '../../type-metadata';
import { DefinitionTypeMetadata } from '../definition-type-metadata';
import { MethodClassMemberMetadata } from './method-class-member-metadata';
import { PropertyClassMemberMetadata } from './property-class-member-metadata';

export class ClassTypeMetadata extends DefinitionTypeMetadata {
  sourceReference: SourceReference;
  name: string;
  genericArguments: TypeMetadata[] = [];
  properties: PropertyClassMemberMetadata[] = [];
  methods: MethodClassMemberMetadata[] = [];

  constructor(tree: ClassDefinitionTree) {
    super();
    this.sourceReference = tree.id.sourceReference;
    this.name = tree.id.text;
    // this.genericParameters = tree.genericParameters.map((x) => new GenericTypeMetadata(x));
  }

  // well no optional and rest parameters at now
  // public findMethodBySignature(
  //   name: string,
  //   parameters: ParameterMetadata[],
  // ): MethodModuleMemberMetadata {
  //   const methodsByName = this.methods.filter((x) => x.name === name);
  //   if (!methodsByName.length) return null;

  //   const methodsByParametersLength = methodsByName.filter(
  //     (x) => x.parameters.length === parameters.length,
  //   );
  //   if (!methodsByParametersLength.length) return null;

  //   const methodsByExactParametersType = methodsByParametersLength.filter((x) =>
  //     x.parameters.every((z, i) => z.type.equals(parameters[i].type)),
  //   );
  //   if (methodsByParametersLength.length === 1) return methodsByExactParametersType[0];
  //   if (methodsByParametersLength.length > 1) throw `Ambiguous methods '${name}'`;

  //   const methodsByInheritedParametersType = methodsByParametersLength.filter((x) =>
  //     x.parameters.every((z, i) => z.type.is(parameters[i].type)),
  //   );
  //   if (methodsByParametersLength.length === 1) return methodsByInheritedParametersType[0];
  //   if (methodsByParametersLength.length > 1) throw `Ambiguous methods '${name}'`;

  //   return null;
  // }

  // public equals(other: ClassDefinitionMetadata) {
  //   return (
  //     this.sourcePath === other.sourcePath &&
  //     this.name === other.name &&
  //     this.genericParameters.length === other.genericParameters.length
  //   );
  // }
}
