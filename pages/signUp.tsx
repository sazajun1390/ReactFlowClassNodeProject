import type { NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  Text,
} from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { auth, db, googleOnSubmit } from '../firebase/firebaseCallFunctions'

const SignUpPage: NextPage = () => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async () => {}
  return (
    <Box w='100vw' h='100vh'>
      <Flex alignItems='center' justifyContent='center' w='100%' h='100%'>
        <Card>
          <CardHeader textAlign='center' fontSize='lg' textColor='white'>
            SingIn
          </CardHeader>
          <CardBody>
            <Center>
              <form>
                <FormControl></FormControl>
              </form>
            </Center>
          </CardBody>
          <CardFooter>
            <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />} onClick={googleOnSubmit}>
              <Center>
                <Text>Sign up with Google</Text>
              </Center>
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Box>
  )
}

export default SignUpPage
