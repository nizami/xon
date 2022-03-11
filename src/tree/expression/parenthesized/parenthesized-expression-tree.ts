// this code was generated

import { ParenthesizedExpressionContext } from '../../../grammar/xon-parser'
import { String } from '../../../lib/core'
import { ExpressionMetadata } from '../../../metadata/expression/expression-metadata'
import { SourceRange } from '../../../util/source-range'
import { getExpressionTree } from '../expression-tree-helper'
import { ExpressionTree } from '../expression-tree'

export class ParenthesizedExpressionTree extends ExpressionTree {
  metadata: ExpressionMetadata
  sourceRange: SourceRange
  expression: ExpressionTree

  constructor() {
    super()
    this.sourceRange = SourceRange.fromContext(ctx)
    this.expression = getExpressionTree(ctx.expr())
  }

  toString(): String {
    return `(${this.expression})`
  }
}

// this code was generated
