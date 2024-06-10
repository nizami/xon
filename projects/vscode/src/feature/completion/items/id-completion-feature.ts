import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  OutputChannel,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode';
import {$Node, is} from '../../../../../core/analyzer/node/node';
import {TokenNode} from '../../../../../core/analyzer/node/token/token-node';
import {Array2} from '../../../../../lib/types';
import {findNodeByPositionInSyntax, getDocumentSyntax} from '../../../util';

export class IdCompletionItemProvider implements CompletionItemProvider {
  constructor(private channel: OutputChannel) {}

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    _token: CancellationToken,
    _context: CompletionContext,
  ): ProviderResult<Array2<CompletionItem> | CompletionList<CompletionItem>> {
    const syntax = getDocumentSyntax(document, this.channel);
    const node = findNodeByPositionInSyntax(syntax, position);

    if (is<TokenNode>(node, $Node.TOKEN)) {
      const item = new CompletionItem(node.text, CompletionItemKind.Property);
    }

    return [];
  }
}
