import { Source } from '~/compiler/source/source';
import { Integer } from '~/lib/core';
import { scanCloseNode } from '~/node/close/close-node';
import { scanCommaNode } from '~/node/comma/comma-node';
import { scanIdNode } from '~/node/id/id-node';
import { scanIntegerNode } from '~/node/integer/integer-node';
import { scanJoiningNode } from '~/node/joining/joining-node';
import { Node, NodeType } from '~/node/node';
import { scanOpenNode } from '~/node/open/open-node';
import { scanOperatorNode } from '~/node/operator/operator-node';
import { scanStringNode } from '~/node/string/string-node';
import { unexpectedNode } from '~/node/unexpected/unexpected-node';
import { scanWhitespaceNode } from '~/node/whitespace/whitespace-node';

type NodeScanFunction = (source: Source, startIndex: Integer, stopIndex: Integer) => Node | null;

const nodeScanFunctions: NodeScanFunction[] = [
  scanOpenNode,
  scanCloseNode,
  scanCommaNode,
  scanStringNode,
  scanJoiningNode,
  scanWhitespaceNode,
  scanOperatorNode,
  scanIdNode,
  scanIntegerNode,
];

export class Scanner {
  public startIndex: Integer;
  public stopIndex: Integer;

  public constructor(public source: Source, startIndex?: Integer, stopIndex?: Integer) {
    this.startIndex = startIndex ?? 0;
    this.stopIndex = stopIndex ?? source.text.length - 1;
  }

  public nodes(): Node[] {
    const scannedNodes: Node[] = [];

    for (let index = this.startIndex; index <= this.stopIndex; index++) {
      const node = this.nextNode(index);

      if (node) {
        scannedNodes.push(node);
        index = node.stopIndex;
        continue;
      }

      const last = scannedNodes[scannedNodes.length - 1];
      if (last?.type === NodeType.UNEXPECTED) {
        last.stopIndex = index;
        continue;
      }

      const unexpected = unexpectedNode(index, index);
      scannedNodes.push(unexpected);
    }

    return scannedNodes;
  }

  nextNode(index: Integer): Node | null {
    for (const nodeScan of nodeScanFunctions) {
      const node = nodeScan(this.source, index, this.stopIndex);
      if (node) {
        return node;
      }
    }
    return null;
  }
}
