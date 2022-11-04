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
import { FuncCard, VarCard, } from '../type/ClassNodeComp';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';

const paramCard: FC< FuncCard | VarCard > = (props) =>{
  const {setter, ...Obj} = props;
  let contxt: JSX.Element;
  
  if('variableName' in props){
    contxt = 
      <>
        <HStack>
          <Box>{props.VarId}. </Box>
          <Button 
            rightIcon={<CloseIcon/>}
            onClick={()=>{

            }}
          >
          </Button>
        </HStack>
        <Box>VarName: {props.variableName}</Box>
        <Box>type: {props.type}</Box>
        <Box>
          <Button 
            leftIcon ={<EditIcon/>} 
            onClick={() => { 
              setter({state:Obj,type:'variables'});
              //setter(Obj)
            }}
          ></Button>
        </Box>
      </>
  }else{
    contxt = 
      <>
        <HStack>
          <Box>{props.FuncId}. </Box>
          <Button 
            rightIcon={<CloseIcon/>}
            onClick={()=>{}}
          >
          </Button>
        </HStack>
        <Box>FuncName: {props.functionName}</Box>
        <Box>type: {props.type}</Box>
        <Box>
          <Button 
            leftIcon ={<EditIcon/>} 
            onClick={() => { 
              setter({state:Obj,type:'functions'});
              //setter(Obj)
            }}
          ></Button>
        </Box>
      </>
  }

  return(
    <Box>
      <Stack w={40} p={3} bg='white' rounded="md" shadow="md" border='1px' borderColor='gray.500' divider={<StackDivider borderColor='gray.200' />}>
        {contxt}
      </Stack>
    </Box>
  )

}

export default memo(paramCard);