import { AttributeContext } from '../../grammar/xon-parser';
import { TypeMetadata } from '../../metadata/type/type-metadata';
import { BaseTree } from '../base.tree';
import { IdToken } from '../id-token';
import { getStatements } from '../statement/statement-tree.helper';
import { StatementTree } from '../statement/statement.tree';
import { getTypeTree } from '../type/type-tree.helper';
import { TypeTree } from '../type/type.tree';

export class AttributeTree extends BaseTree {
  id: IdToken;
  isPrivate: boolean;
  type?: TypeTree;
  body?: StatementTree[];
  typeMetadata: TypeMetadata;

  constructor(public ctx?: AttributeContext) {
    super();
    if (!ctx) return;

    this.id = new IdToken(ctx._name);
    this.isPrivate = this.id.text.startsWith('_');
    this.type = getTypeTree(ctx.type()) || null;
    this.body = getStatements(ctx.body()) || null;
  }
}
