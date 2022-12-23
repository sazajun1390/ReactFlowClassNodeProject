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
  varType: string
}

/*interface VarCard extends VariableObj {
  setter: Dispatch<SetStateAction<VariableObj | FunctionObj | null>>
}*/

interface VarCard extends VariableObj {
  setter: Dispatch<formObjectReducerState>
}

type FuncArg = {
  /**
   *
   * @minimum 1
   *
   */
  arg: string
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

  funcArgs: Array<FuncArg>

  /**
   *
   * @minLength 1
   *
   */
  funcType: string
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
  // @ts-ignore
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

/**
 * import { z } from 'zod'

const variableObjSchema = z.object({
  VarId: z.number({ required_error: 'className is required' }).min(1),
  variableName: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
  type: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
})

const functionObjSchema = z.object({
  FuncId: z.number({ required_error: 'className is required' }).min(1),
  functionName: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
  type: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
})

const formObjectTypeSchema = z.union([functionObjSchema, variableObjSchema]).nullable()

const classNodeDataSchema = z.object({
  className: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' })
    .max(8),
  variables: z.array(variableObjSchema),
  functions: z.array(functionObjSchema),
})

export { classNodeDataSchema }
 */

/*
 *
 */
