import { useCallback, useRef, memo, FC, useState, Key, useEffect } from 'react'
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from 'reactflow'
import {
  Divider,
  Box,
  Button,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  FormControl,
  FormErrorMessage,
  Input
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import type { VariableObj, FunctionObj, ClassNode, ClassNodeData } from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import { useEditData } from '../zustand/EditData'
import shallow from 'zustand/shallow'
import { FramerBox, FramerLayoutGroup } from '../chakraFactory/Framer'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useAnimationControls } from 'framer-motion'
//import * as yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod'
import { classNodeDataSchema } from '../type/zod/zodClassNodeComp.zod'
import { FunctionsFormField, VarsFormField } from './FormField'

const ClassNodeComp: FC<NodeProps<ClassNodeData>> = (props) => {
  const { data } = props
  const EditorOnOpen = useDisclojureStore.getState().onOpen
  const { getNode, setNodes } = useReactFlow()

  const { editId, editClassName, editFuncs, editVars, diseditable } = useEditData(
    (state) => ({
      editId: state.id,
      editClassName: state.className,
      editFuncs: state.functions,
      editVars: state.variables,
      diseditable: state.dnotEdit,
    }),
    shallow,
  )

  const { allowEdit, denyEdit } = useEditData((state) => ({
    allowEdit: state.allowEdit,
    denyEdit: state.denyEdit,
  }))
  const [isOpen, setOpen] = useState(false)

  const [nodeClass, setNodeClass] = useState(data)
  const methods = useForm<ClassNodeData>({
    defaultValues: {
      className: nodeClass.className,
      functions: nodeClass.functions,
      variables: nodeClass.variables,
    },
    resolver: zodResolver(classNodeDataSchema),
  })

  const {
    watch,
    getValues,
    handleSubmit,
    control,
    getFieldState,
    register,
    formState: { errors, isSubmitted, defaultValues },
  } = methods

  useCallback(() => {
    setOpen(isOpen ? false : true)
    isOpen ? allowEdit : denyEdit
  }, [isOpen])

  const onSubmit = useCallback(() => {}, [nodeClass])

  return (
    <Box>
      <Stack p={3} bg='white' rounded='md' shadow='md' border='1px' borderColor='gray.500'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <Editable value={watch('className')}>
              <EditablePreview />
              <FormControl id='className' isInvalid={!!errors.className}>
                <Input as={EditableInput} {...register('className')} />
                <FormErrorMessage>{errors.className?.message}</FormErrorMessage>
              </FormControl>
            </Editable>
            <Divider />
            <Box>
              <FunctionsFormField />
              <Divider />
              <VarsFormField />
            </Box>
          </FormProvider>
        </form>
        <Box>
          <Button
            leftIcon={<EditIcon />}
            onClick={() => {
              //EditorOnOpen()
            }}
          ></Button>
        </Box>
        <Handle type='target' position={Position.Left} />
        <Handle type='source' position={Position.Left} />
        <Handle type='target' position={Position.Right} />
        <Handle type='source' position={Position.Right} />
      </Stack>
    </Box>
  )
}

export default memo(ClassNodeComp)

/*
  <Controller
              name='className'
              control={control}
              render={(controlProps) => (
                <Editable value={controlProps.field.value}>
                  <EditablePreview />
                  <FormControl id="className" isInvalid={!!errors.className}>
                    <EditableInput {...controlProps.field} />
                    <FormErrorMessage>
                      {errors.className?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Editable>
              )}
            />


  {functions.fields.map((item, index) => {
                return (
                  <HStack spacing={6} justify='center' key={index}>
                    <FramerBox
                      visibility={
                        focusFuncFieldNum == `functions.${index}.FunId` ? 'visible' : 'hidden'
                      }
                      display={focusFuncFieldNum == `functions.${index}.FunId` ? 'block' : 'none'}
                    >
                      <IconButton aria-label='deleteFunction' key={index} icon={<CloseButton />} />
                    </FramerBox>
                    <Box>-</Box>
                    <Controller
                      name={`functions.${index}.functionName`}
                      control={control}
                      render={(controlProps) => (
                        <Editable
                          value={controlProps.field.value}
                          onFocus={() => {
                            console.log('focus')
                            setFocusFuncFieldNum(`functions.${index}.FunId`)
                          }}
                          onBlur={() => {
                            console.log('blur')
                            setFocusFuncFieldNum(null)
                          }}
                        >
                          <EditablePreview />
                          <EditableInput {...controlProps.field} />
                          <FormErrorMessage>
                            {errors.functions?.[index]?.functionName &&
                              errors.functions?.[index]?.functionName?.message}
                          </FormErrorMessage>
                        </Editable>
                      )}
                    />
                    <Box>{': '}</Box>
                    <Controller
                      name={`functions.${index}.type`}
                      control={control}
                      render={(controlProps) => (
                        <Editable
                          value={controlProps.field.value}
                          onFocus={() => {
                            setFocusFuncFieldNum(`functions.${index}.FunId`)
                          }}
                          onBlur={() => {
                            setFocusFuncFieldNum(null)
                          }}
                        >
                          <EditablePreview />
                          <EditableInput {...controlProps.field} />
                        </Editable>
                      )}
                    />
                  </HStack>
                )
              })}
*/
