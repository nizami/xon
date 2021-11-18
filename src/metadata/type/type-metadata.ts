import { SourceReference } from '../../tree/source-reference';

export abstract class TypeMetadata {
  abstract sourceReference: SourceReference;
  abstract name: string;
  genericArguments: TypeMetadata[];

  useGenerics(genericArguments: TypeMetadata[]) {
    this.genericArguments = genericArguments;
  }
}
