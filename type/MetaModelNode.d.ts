interface MetaModelNode {
  className: string
  variableName: Array<MetaVarObj>
}

interface MetaVarObj {
  variableName: string
  type: string
}
