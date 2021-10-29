import { IdToken } from '../../../tree/id-token';
import { TypeMetadata } from '../type-metadata';

export class NullableTypeMetadata extends TypeMetadata {
  public name: string;
  innerType: TypeMetadata;

  constructor(public idToken: IdToken) {
    super();
    this.name = this.constructor.name.replace(TypeMetadata.name, '');
  }
}
