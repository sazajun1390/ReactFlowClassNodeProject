import { useCallback, useRef, memo , FC ,useState, Key, useEffect} from 'react';
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from 'reactflow';
import {
  Divider,
  Box,
  Button,
  Stack,
  HStack,
  Heading,
  FormControl,
  Collapse,
  useDisclosure,
  Fade,
  Input,
  Editable,
  EditablePreview,
  EditableInput,
  FormLabel,
  useEditableControls,
  IconButton,
  CloseButton,
  FormErrorMessage,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import type { VariableObj, FunctionObj, ClassNode, ClassNodeData} from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure';
import { useEditData } from '../zustand/EditData';
import shallow from 'zustand/shallow';
import {FramerBox,FramerLayoutGroup} from '../chakraFactory/Framer';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useAnimationControls } from 'framer-motion';
//import * as yup from 'yup';
import { zodResolver } from "@hookform/resolvers/zod";
import { classNodeDataSchema } from '../type/zodClassNodeComp';



const ClassNodeComp: FC<NodeProps<ClassNodeData>> = ( props ) => {
  const { data } = props;
  const EditorOnOpen = useDisclojureStore.getState().onOpen;
  const { getNode, setNodes } = useReactFlow()
  
  const { editId, editClassName, editFuncs, editVars, diseditable } = useEditData( state => ({
    editId: state.id,
    editClassName: state.className,
    editFuncs: state.functions,
    editVars: state.variables,
    diseditable: state.dnotEdit,
  }),shallow)

  const { allowEdit, denyEdit } = useEditData( state => ({
    allowEdit: state.allowEdit,
    denyEdit: state.denyEdit
  }))
  const [isOpen,setOpen] = useState(false)

  const [ nodeClass,setNodeClass ] = useState(data)
  const {
    control,
    getFieldState,
    formState: {errors, isSubmitted}
  } =useForm<ClassNodeData>({
    defaultValues:{
      className: nodeClass.className,
      functions: nodeClass.functions,
      variables: nodeClass.variables
    },
    resolver: zodResolver(classNodeDataSchema)
  })
  const functions = useFieldArray({
    name:'functions',
    control
  });
  const vars = useFieldArray({
    name:'variables',
    control
  })

  useCallback(()=>{
    setOpen((isOpen)?false:true);
    (isOpen)?allowEdit:denyEdit
  },[isOpen])

  const onSubmit = useCallback(()=>{},[nodeClass])

  const [focusFuncFieldNum,setFocusFuncFieldNum] = useState<string | null>(null);
  const [focusVarFieldNum,setFocusVarFieldNum] = useState<string | null>(null);
  
  return (
    <Box>
      <Stack p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' >
        <form>
          <Controller
            name='className'
            control={control}
            render={(controlProps)=>(
              <Editable
                value={controlProps.field.value}
              >
                <EditablePreview/>
                <EditableInput
                  {...controlProps.field}
                />
              </Editable>
            )}
          />
          <Divider />
          <Box>
            {functions.fields.map((item, index)=> {
              return(
              <HStack
                spacing={6} justify='center' key={index}
              >
                <FramerBox
                  visibility={(focusFuncFieldNum==`functions.${index}.FunId`)?'visible':'hidden'}
                  display={(focusFuncFieldNum==`functions.${index}.FunId`)?'block':'none'}
                >
                  <IconButton
                    aria-label='deleteFunction' 
                    key={index}
                    icon={<CloseButton />}
                  />
                </FramerBox>
                <Box>
                  -
                </Box>
                <Controller
                name={`functions.${index}.functionName`}
                control={control}
                render={(controlProps)=>(
                  <Editable
                    value={controlProps.field.value}
                    onFocus={()=>{
                      console.log('focus')
                      setFocusFuncFieldNum(`functions.${index}.FunId`);
                    }}
                    onBlur={()=>{
                      console.log('blur')
                      setFocusFuncFieldNum(null);
                    }}
                  >
                    <EditablePreview />
                    <EditableInput 
                      {...controlProps.field}
                    />
                    <FormErrorMessage>
                      {errors.functions?.[index]?.functionName && errors.functions?.[index]?.functionName?.message}
                    </FormErrorMessage>
                  </Editable>
                )}
                />
                <Box>
                  {': '}
                </Box>
                <Controller
                  name={`functions.${index}.type`}
                  control={control}
                  render={(controlProps)=>(
                    <Editable
                      value={controlProps.field.value}
                      onFocus={()=>{
                        setFocusFuncFieldNum(`functions.${index}.FunId`);
                      }}
                      onBlur={()=>{
                        setFocusFuncFieldNum(null);
                      }}
                    >
                      <EditablePreview />
                      <EditableInput 
                        {...controlProps.field}
                      />
                    </Editable>
                )}
                />
              </HStack>
              )
            })}
            <Divider/>
            {vars.fields.map((item, index)=>{
              return(
                <HStack spacing={6} justify='center' key={index} >
                  <FramerLayoutGroup>
                    <FramerBox
                      visibility={(focusVarFieldNum==`variables.${index}.VarId`)?'visible':'hidden'}
                      display={(focusVarFieldNum==`variables.${index}.VarId`)?'block':'none'}
                    >
                      <IconButton
                        aria-label='deleteVars' 
                        key={index}
                        icon={<CloseButton />}
                      />
                    </FramerBox>
                    <Box>
                      {'+ '}
                    </Box>
                    <Controller
                      name={`variables.${index}.variableName`}
                      control={control}
                      render={(controlProps)=>(
                        <Editable
                          value={controlProps.field.value}
                          onFocus={()=>{
                            console.log('focus')
                            setFocusVarFieldNum(`variables.${index}.VarId`);
                          }}
                          onBlur={()=>{
                            console.log('blur')
                            setFocusVarFieldNum(null);
                          }}
                        >
                          <EditablePreview />
                          <EditableInput
                            {...controlProps.field}
                          />
                        </Editable>
                      )}
                    />
                    <Box>
                      {': '}
                    </Box>
                    <Controller
                      name={`variables.${index}.type`}
                      control={control}
                      render={(controlProps)=>(
                        <Editable
                          value={controlProps.field.value}
                          onFocus={()=>{
                            console.log('focus')
                            setFocusVarFieldNum(`variables.${index}.VarId`);
                          }}
                          onBlur={()=>{
                            console.log('blur')
                            setFocusVarFieldNum(null);
                          }}
                        >
                          <EditablePreview />
                          <EditableInput
                            {...controlProps.field}
                          />
                        </Editable>
                      )}
                    />
                  </FramerLayoutGroup>
                </HStack>
              )
            })}
          </Box>
        </form>
        <Box>
          <Button 
            leftIcon ={<EditIcon/>} 
            onClick={() => {
              //EditorOnOpen()
              
            }}
          ></Button>
        </Box> 
        <Handle type="target" position ={Position.Left} />
        <Handle type='source' position ={Position.Left} />
        <Handle type="target" position = {Position.Right} />
        <Handle type="source" position = {Position.Right} />
      </Stack>
    </Box>
  );
}

export default memo(ClassNodeComp);