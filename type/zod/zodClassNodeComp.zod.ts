// Generated by ts-to-zod
import { z } from 'zod'

const funcArgSchema = z.object({
  arg: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
})

const variableObjSchema = z.object({
  VarId: z.number({ required_error: 'className is required' }).min(1),
  variableName: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
  varType: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
})

const functionObjSchema = z.object({
  FuncId: z.number({ required_error: 'className is required' }).min(1),
  functionName: z
    .string({ required_error: 'className is required' })
    .min(1, { message: 'Must be 1 or more characters long' }),
  funcArgs: z.array(funcArgSchema),
  funcType: z
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

const classNodeSchema = z.object({
  data: classNodeDataSchema,
})
export { classNodeSchema }