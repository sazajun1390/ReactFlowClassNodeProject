import { Node, NodeTypes } from 'reactflow'
import { ReactNode, Dispatch, SetStateAction } from 'react'

interface ClassNodeData {
  /**
   *
   * @miniLength 2
   * @maxLength 8
   *
   */
  className: string
  variables: Array<VariableObj>
  functions: Array<FunctionObj>
}

interface VariableObj {
  /**
   *
   * @minLength 1
   *
   */
  VarId: number
  /**
   *
   * @minLength 1
   *
   */
  variableName: string
  /**
   *
   * @minLength 1
   *
   */
  type: string
}

/*interface VarCard extends VariableObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}*/

interface VarCard extends VariableObj {
  setter: Dispatch<formObjectReducerState>
}

interface FunctionObj {
  /**
   *
   * @minLength 1
   *
   */
  FuncId: number

  /**
   *
   * @minLength 1
   *
   */
  functionName: string

  /**
   *
   * @minLength 1
   *
   */
  type: string
}

/*interface FuncCard extends FunctionObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}*/

interface FuncCard extends FunctionObj {
  setter: Dispatch<formObjectReducerState>
}

type ClassNode = Node<ClassNodeData>

type formObjectType = null | FunctionObj | VariableObj

interface formObjectReducerState {
  /* eslint no-unused-vars: 0 */
  state: formObjectState

  /**
   *
   * @minLength 1
   *
   */
  type: string
}

export type {
  ClassNodeData,
  VariableObj,
  VarCard,
  FunctionObj,
  FuncCard,
  ClassNode,
  formObjectReducerState,
  formObjectType,
}
