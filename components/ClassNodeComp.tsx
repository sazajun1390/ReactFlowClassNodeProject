import { useCallback, useRef, memo , FC ,useState, Key, useEffect} from 'react';
import { Handle, NodeProps, Position, useReactFlow, useStoreApi } from 'reactflow';
import {
  Divider,
  Box,
  Button,
  Stack,
  HStack,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import type { VariableObj, FunctionObj, ClassNode, ClassNodeData} from '../type/ClassNodeComp'
import { useDisclojureStore } from '../zustand/EditorsDIscrojure';
import { useEditData } from '../zustand/EditData';
import shallow from 'zustand/shallow';
import FramerBox from '../chakraFactory/FramerBox';
import { useForm } from 'react-hook-form';

const ClassNodeComp: FC<NodeProps<ClassNodeData>> = ( props ) => {
  const { data } = props;
  //const [ idState, setId ] = useState(id);
  //const EditorOnOpen = useDisclojureStore.subscribe( ()=>{}, state => state.onOpen);
  const EditorOnOpen = useDisclojureStore.getState().onOpen;
  //const setClassNodeData = () => useEditData(state => state.setData(id));
  const { getNode } = useReactFlow()

  const { editId, editClassName, editFuncs, editVars } = useEditData( state => ({
    editId: state.id,
    editClassName: state.className,
    editFuncs: state.functions,
    editVars: state.variables
  }),shallow)

  useCallback(()=>{

  },[editId,editClassName,editFuncs,editVars])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  return (
    <Box>
      <Stack p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' >
        <Box>
          <FramerBox onClick={()=>{

          }}>
            {data.className}
          </FramerBox>
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
              EditorOnOpen()
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