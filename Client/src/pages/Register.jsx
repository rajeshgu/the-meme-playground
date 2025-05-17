import { Box, Heading, Flex, Link as ChakraLink, Text as ChakraText } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <Box maxW="md" mx="auto" mt={10} p={6}>
      <Heading mb={6} textAlign="center">
        Create an Account
      </Heading>
      <RegisterForm />
      <Flex justify="center" mt={4}>
        <ChakraText>
          Already have an account?{' '}
          <ChakraLink as={RouterLink} to="/login" color="purple.500">
            Login
          </ChakraLink>
        </ChakraText>
      </Flex>
    </Box>
  );
};

export default Register;