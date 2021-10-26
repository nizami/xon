import { AssignmentStatementTree } from '../../tree/statement/assignment-statement/assignment-statement.tree';
import { StatementTree } from '../../tree/statement/statement.tree';
import { AssignmentHandler } from './assignment-handler';
import { MetadataHandler } from './metadata-handler';

export class StatementHandler extends MetadataHandler {
  handle(tree: StatementTree) {
    if (tree instanceof AssignmentStatementTree) {
      new AssignmentHandler(this.scope).handle(tree.assignment);
      return;
    }
    if (tree instanceof AssignmentStatementTree) {
      new AssignmentHandler(this.scope).handle(tree.assignment);
      return;
    }

    throw new Error('Wrong statement tree');
  }
}
