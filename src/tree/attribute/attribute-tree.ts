// this code was generated

import { AttributeContext } from '../../grammar/xon-parser'
import { none, None, String } from '../../lib/core'
import { AttributeDeclarationMetadata } from '../../metadata/declaration/attribute/attribute-declaration-metadata'
import { getIdToken, IdToken } from '../../util/id-token'
import { SourceRange } from '../../util/source-range'
import { getBodyTree } from '../body/body-tree-helper'
import { BodyTree } from '../body/body-tree'
import { getExpressionTree } from '../expression/expression-tree-helper'
import { ExpressionTree } from '../expression/expression-tree'
import { getParameterTrees } from '../parameter/parameter-tree-helper'
import { ParameterTree } from '../parameter/parameter-tree'
import { Tree } from '../tree'

export class AttributeTree extends Tree {
  metadata: AttributeDeclarationMetadata
  sourceRange: SourceRange
  isMethod: boolean
  name: IdToken
  parameters: ParameterTree[]
  type?: (ExpressionTree | None)
  body?: (BodyTree | None)

  constructor(ctx: AttributeContext) {
    super()
    this.sourceRange = SourceRange.fromContext(ctx)
    this.isMethod = !!ctx.parameters()
    this.name = getIdToken(ctx._name)
    this.parameters = getParameterTrees(ctx.parameters()?.parameter())
    this.type = getExpressionTree(ctx.expr()) || none
    this.body = getBodyTree(ctx.body()) || none
  }

  toString(): String {
    let parameters, type, body
    parameters = (this.isMethod && `[${this.parameters.join(', ')}]`) || ''
    type = (this.type && ' ' + this.type) || ''
    body = (this.body && this.body) || ''
    return this.name + parameters + type + body
  }
}

// this code was generated
