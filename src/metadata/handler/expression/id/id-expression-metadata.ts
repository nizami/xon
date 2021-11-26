import { IdExpressionTree } from '../../../../tree/expression/id-expression/id-expression.tree';
import { DeclarationScope } from '../../declaration-scope';
import { AttributeDeclarationMetadata } from '../../declaration/attribute/attribute-declaration-metadata';
import { ClassDeclarationMetadata } from '../../declaration/class/class-declaration-metadata';
import { TypeMetadata } from '../../type/type-metadata';
import { ExpressionMetadata } from '../expression-metadata';

export class IdExpressionMetadata extends ExpressionMetadata {
  type: TypeMetadata;

  constructor(tree: IdExpressionTree, scope: DeclarationScope) {
    super();

    const declaration = scope.get(tree.id.text);
    tree.id.metadata = declaration;
    if(declaration instanceof AttributeDeclarationMetadata)
    this.type = declaration.type;
    else if(declaration instanceof ClassDeclarationMetadata){
      this.type = 
    }
  }
}
