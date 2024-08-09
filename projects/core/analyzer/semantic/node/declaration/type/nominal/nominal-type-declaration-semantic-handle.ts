import {$, is} from '../../../../../../$';
import {DeclarationNode} from '../../../../../syntax/node/declaration/declaration-node';
import {createDeclarationManager} from '../../../../declaration-manager';
import {SemanticAnalyzer} from '../../../../semantic-analyzer';
import {functionTypeSemantic} from '../../../type/function/function-type-semantic';
import {parametersOrGenericsParse} from '../../../type/function/function-type-semantic-parser';
import {idTypeSemantic} from '../../../type/id/id-type-semantic';
import {typeSemanticParse} from '../../../type/type-semantic-parser';
import {declarationsParse} from '../../declaration-semantic-parser';
import {NominalTypeDeclarationSemantic} from './nominal-type-declaration-semantic';

export function nominalTypeDeclarationSemanticHandle(
  analyzer: SemanticAnalyzer,
  semantic: NominalTypeDeclarationSemantic,
  node: DeclarationNode,
): void {
  if (node.type) {
    // todo use 'unknownType' type instead of 'nothing' ???
    semantic.baseType = typeSemanticParse(analyzer, node.type);
  }

  const resultType = idTypeSemantic(analyzer.reference(node.id), semantic.name, semantic);

  if (node.generics) {
    const generics = parametersOrGenericsParse(analyzer, node, node.generics);
    semantic.type = functionTypeSemantic(analyzer.reference(node.generics), generics, resultType);

    return;
  }

  semantic.type = resultType;

  if (node.attributes) {
    semantic.attributes = createDeclarationManager();

    const attributes = declarationsParse(analyzer, node.attributes).filter((x) =>
      is(x, $.ValueDeclarationSemantic),
    );

    for (const attribute of attributes) {
      semantic.attributes.add(attribute);
    }

    if (semantic.baseType) {
      for (const attribute of semantic.baseType.attributes().all()) {
        semantic.attributes.add(attribute);
      }
    }
  }

  if (node.parameters) {
    throw new Error('Not implemented');
  }
}
