import type { NextPage } from 'next'
import useSWR from "swr";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, FormControl, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { auth, db } from '../firebase/firebaseCallFunctions'

const SignUpPage: NextPage = () => {
  const router = useRouter(); 

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    
  }
  return(
    <Flex alignItems='center' justifyContent='center' bg='cool-gray-500'>
      <Card bg='light-700'>
        <CardHeader textAlign='center' fontSize='lg' textColor='blackAlpha.300'>
          SingIn
        </CardHeader>
        <CardBody>
          <Center>
            <form>
              <FormControl>

              </FormControl>
            </form>
          </Center>
        </CardBody>
        <CardFooter>
          <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
            <Center>
              <Text>Sign up with Google</Text>
            </Center>
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}

export default SignUpPage