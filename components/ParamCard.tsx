import { FC, useEffect, Key, memo} from 'react'
import { 
  Box,
  useColorModeValue,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Button,
  StackDivider,
  HStack
} from '@chakra-ui/react'
import { FuncCard, FunctionObj, VarCard, VariableObj } from '../type/ClassNodeComp';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';

const paramCard: FC< FuncCard | VarCard > = (props) =>{
  
  let contxt: JSX.Element;
  
  if('variableName' in props){
    contxt = 
      <>
        <HStack>
          <Box>{props.VarId}. </Box>
          <Button 
            rightIcon={<CloseIcon/>}
            onClick={()=>{}}
          >
          </Button>
        </HStack>
        <Box>VariableName: {props.variableName}</Box>
        <Box>type: {props.type}</Box>
        <Box>
          <Button 
            leftIcon ={<EditIcon/>} 
            onClick={() => { 
            }}
          ></Button>
        </Box>
      </>
  }else{
    contxt = 
      <>
        <HStack>
          <Box>{props.funcId}. </Box>
          <Button 
            rightIcon={<CloseIcon/>}
            onClick={()=>{}}
          >
          </Button>
        </HStack>
        <Box>FunctionName: {props.functionName}</Box>
        <Box>type: {props.type}</Box>
        <Box>
          <Button 
            leftIcon ={<EditIcon/>} 
            onClick={() => { 
            }}
          ></Button>
        </Box>
      </>
  }

  return(
    <Stack p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' divider={<StackDivider borderColor='gray.200' />}>
      {contxt}
    </Stack>
  )

}

export default memo(paramCard);