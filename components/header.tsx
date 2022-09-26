import React from "react"
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react"

import {
  
} from "@chakra-ui/icons"

const header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white','grey.600')}
        color={useColorModeValue('gray.600','white')}
        minH={'60px'}
        py = {{ base: 2 }}
        px = {{ base: 2 }}
        borderBottom = {1}
        borderStyle = {'solid'}
        borderColor = {useColorModeValue('gray.200','gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base:1, md: 'auto'}}
        >

        </Flex>
      </Flex>
    </Box>
  )
}

export default header();