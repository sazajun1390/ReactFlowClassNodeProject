import { useCallback, useRef, memo , FC ,useState, Key} from 'react';
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
import { useDisclojureStore } from '../zustand/EditorDIscrojure';
import { useEditData } from '../zustand/EditData';

const ClassNodeComp: FC<NodeProps<ClassNodeData>> = ( props ) => {
  const { id, data } = props
  const store = useStoreApi();
  //const [ idState, setId ] = useState(id);

  //const EditorOnOpen = useDisclojureStore.subscribe( ()=>{}, state => state.onOpen);
  const EditorOnOpen = useDisclojureStore.getState().onOpen;
  //const setClassNodeData = () => useEditData(state => state.setData(id));
  const setClassNodeData = () => useEditData.getState().setData(id,data);
  return (
    <>
      <Stack p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' >
        <Box>
          <Box>
            {data.className}
          </Box>
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
              setClassNodeData()
            }}
          ></Button>
        </Box> 
        <Handle type="target" position ={Position.Left} />
        <Handle type='source' position ={Position.Left} />
        <Handle type="target" position = {Position.Right} />
        <Handle type="source" position = {Position.Right} />
      </Stack>
    </>
  );
}


export default memo(ClassNodeComp);