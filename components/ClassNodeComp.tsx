import { useCallback, useRef, memo, FC, useState, Key, useEffect } from 'react'
import {
  Connection,
  Edge,
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
  addEdge,
} from 'reactflow'
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
  Input,
  useEditableControls,
  BorderProps,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import type {
  VariableObj,
  FunctionObj,
  ClassNode,
  ClassNodeData,
  fieldPreviewProps,
} from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure'
import { useEditData } from '../zustand/EditData'
import shallow from 'zustand/shallow'
import { FramerBox, FramerLayoutGroup } from '../chakraFactory/Framer'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useAnimationControls } from 'framer-motion'
//import * as yup from 'yup';
import { zodResolver } from '@hookform/resolvers/zod'
import { classNodeSchema } from '../type/zod/zodClassNodeComp.zod'
import { FunctionsFormField, VarsFormField } from './FormField'
import { css } from '@emotion/react'
import type { FieldError } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form'

const ClassNodeComp: FC<NodeProps<ClassNodeData>> = (props) => {
  const data = props
  const EditorOnOpen = useDisclojureStore.getState().onOpen
  const { getNodes, setNodes, setEdges } = useReactFlow()

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
  const methods = useForm<ClassNode>({
    defaultValues: {
      ...nodeClass
    },
    resolver: zodResolver(classNodeSchema),
    mode: 'all',
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

  const onSubmit: SubmitHandler<ClassNode> = (data) => {
    const nodes = getNodes()
    nodes.find((elm: ClassNode, index) => {
      if(elm.id===data.id){
        
      }
    })
  }

  const handleStyle = {
    width: '15px',
    height: '10px',
    background: '#818181',
    borderRadius: '1px',
  }
  const sourceHandle = {
    top: '10px',
  }

  const rightOutputHandle = {}
  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )
  const [classNameFieldError, setClassNameFieldError] = useState<fieldPreviewProps | null>(null)
  useEffect(() => {
    //setclassNameFieldError(typeof errors.className === 'undefined' ? false : true )
    setClassNameFieldError(
      typeof errors.data?.className === 'undefined'
        ? null
        : {
            border: '2px',
            borderColor: 'red.400',
          },
    )
  }, [errors.data?.className])

  return (
    <Box>
      <Stack p={3} bg='white' rounded='md' shadow='md' border='1px' borderColor='gray.500'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <FormControl isRequired isInvalid={!!errors.data?.className}>
              <Editable defaultValue={getValues('data.className')}>
                <EditablePreview w='100%' {...classNameFieldError} />
                <EditableInput {...classNameFieldError} {...register('data.className')} />
                <FormErrorMessage>{errors.data?.className?.message}</FormErrorMessage>
              </Editable>
            </FormControl>
            <Divider />
            <Box>
              <FunctionsFormField />
              <Divider />
              <VarsFormField />
            </Box>
          </FormProvider>
        </form>
        <Box>
          <Button leftIcon={<EditIcon />} type='submit'></Button>
        </Box>
        <Handle type='target' position={Position.Left} style={handleStyle} />

        <Handle type='source' position={Position.Right} style={handleStyle} />
      </Stack>
    </Box>
  )
}

export default memo(ClassNodeComp)

/*
  
            onClick={() => {
              //EditorOnOpen()
            }}
  {...(!!errors.className && {
                    boxShadow: '0 0 0 2px red',
                    px: 3,
                  })}
  <Handle type='source' position={Position.Left}  onConnect={onConnect} isConnectable={true} style={handleStyle}/>
  <Handle type='target' position={Position.Right}  onConnect={onConnect} isConnectable={true} style={handleStyle}/>
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
