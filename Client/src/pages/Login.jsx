import { Box, Heading, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import AuthModal from '../components/auth/AuthModal';
import { useState } from 'react';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for login, 1 for register

  return (
    <Box maxW="md" mx="auto" mt={10} p={6}>
      <Heading mb={6} textAlign="center">
        Welcome Back
      </Heading>
      
      <LoginForm />
      
      <Flex justify="center" mt={4}>
        <Text>
          Don't have an account?{' '}
          <ChakraLink 
            as={RouterLink} 
            to="/register" 
            color="purple.500"
            fontWeight="semibold"
          >
            Sign up
          </ChakraLink>
        </Text>
      </Flex>

      {/* Alternative using modal (if preferred) */}
      {/* 
      <Flex justify="center" mt={4}>
        <Text>
          Don't have an account?{' '}
          <ChakraLink 
            onClick={() => {
              setActiveTab(1);
              setIsModalOpen(true);
            }}
            color="purple.500"
            fontWeight="semibold"
            cursor="pointer"
          >
            Sign up
          </ChakraLink>
        </Text>
      </Flex>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        defaultTab={activeTab}
      />
      */}
    </Box>
  );
};

export default Login;