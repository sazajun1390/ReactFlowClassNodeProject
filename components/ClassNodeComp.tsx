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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import type { VariableObj, FunctionObj, ClassNode, ClassNodeData} from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure';
import { useEditData } from '../zustand/EditData';
import shallow from 'zustand/shallow';
import FramerBox from '../chakraFactory/FramerBox';
import { Controller, useForm } from 'react-hook-form';
import { useAnimationControls } from 'framer-motion';

const ClassNodeComp: FC<NodeProps<ClassNodeData>> = ( props ) => {
  const { data } = props;
  //const [ idState, setId ] = useState(id);
  //const EditorOnOpen = useDisclojureStore.subscribe( ()=>{}, state => state.onOpen);
  const EditorOnOpen = useDisclojureStore.getState().onOpen;
  //const setClassNodeData = () => useEditData(state => state.setData(id));
  const { getNode } = useReactFlow()

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
    getValues,
    control, 
    watch,
    setValue,
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: {errors,isSubmitting,isValid}
  } =useForm({
    defaultValues:{
      className: nodeClass.className,
    }
  })
  
  const animationControls = useAnimationControls()


  useCallback(()=>{
    setOpen((isOpen)?false:true);
    (isOpen)?allowEdit:denyEdit
  },[isOpen])

  const onSubmit = useCallback(()=>{},[nodeClass.className])
  return (
    <Box>
      <Stack p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' >
        <Box>
          <form>
            <Controller
              name='className'
              defaultValue={getValues('className')}
              control={control}
              render={(controlProps)=>(
                <Editable
                  value={controlProps.field.value}
                >
                  <EditablePreview/>
                  <EditableInput />
                </Editable>
              )}
            />
          </form>
          <Divider />
          <Box>
            {data.functions.map((items:FunctionObj, index: Key)=>{
              console.log(items)
              return(
              <HStack spacing={6} justify='center' key={index}>
                <Box>
                  -
                </Box>
                <Box>
                  {items.functionName}
                </Box>
                <Box>
                  :{items.type}
                </Box>
              </HStack>)
            })}
            <Divider/>
            {data.variables.map((items:VariableObj, index: Key)=>{
              console.log(items)
                return(
                  <HStack spacing={6} justify='center' key={index}>
                    <Box>
                      +
                    </Box>
                    <Box>
                      {items.variableName}
                    </Box>
                    <Box>
                      :{items.type}
                    </Box>
                  </HStack>
            )})}
            <Divider/>
          </Box>
        </Box>
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
/*
  <Controller
              name='ClassName'
              defaultValue={data.className}
              control={control}
              render={(controlProps)=>(
                <Editable
                  fontSize='lg'
                  fontWeight='bold'
                  isPreviewFocusable={false}
                  submitOnBlur={false}
                  value={controlProps.field.value}
                >
                  {(props)=> (
                    <>
                      <EditablePreview/>
                      <EditableInput {...controlProps.field} />
                    </>
                  )}

                </Editable>
              )}
            >

            </Controller>

          
          <Box
            display={(isOpen)?'none':'block'}
          >
            <form onSubmit={handleSubmit(onSubmit)} >
              <FormControl isInvalid={isValid}>
                <FormLabel htmlFor='className'></FormLabel>
                <Input id='className'
                  size='md'
                ></Input>
              </FormControl>
            </form>
          </Box>
          <Box
            display={(isOpen)?'none':'block'}
          >
            {data.className}
          </Box>
          
*/

export default memo(ClassNodeComp);