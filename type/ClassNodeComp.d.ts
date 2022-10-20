interface ClassNodeComp {
  className: string,
  variables: Array<VariableObj>
  functions: Array<FunctionObj>
}

interface VariableObj<T> {
  variableName: string,
  type: string
}

interface FunctionObj<T> {
  functionName: string,
  type: string
}