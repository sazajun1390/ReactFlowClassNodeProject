import type { NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/dist/client/router'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Center,
  FormControl,
  Button,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { auth, db, googleOnSubmit } from '../firebase/firebaseCallFunctions'

const SignInPage: NextPage = () => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    try {
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex alignItems='center' justifyContent='center' bg='cool-gray-500'>
      <Card bg='light-700'>
        <CardHeader textAlign='center' fontSize='lg' textColor='blackAlpha.300'>
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
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}

export default SignInPage
