import { useCallback, useRef, memo , FC } from 'react';
import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow';
import {
  Flex,
  Circle,
  Box,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const EditNode = ({ value, handleId, nodeId }) => {
  

}
const ClassNodeComp: FC = (props) => {
  const { 
    setNodes, 
    getNodes, 
    addNodes, 
    addEdges, 
    getEdge, 
    getEdges, 
    getNode,
    toObject
  } = useReactFlow();
  const store = useStoreApi();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Box>
        
      </Box>
      <Box>
        <Button leftIcon ={<EditIcon/>} ></Button>
      </Box> 
      <Handle type="target" position ={Position.Left} />
      <Handle type='source' position ={Position.Left} />
      <Handle type="target" position = {Position.Right} />
      <Handle type="source" position = {Position.Right} />

    </Box>
  );
}

export default ClassNodeComp;