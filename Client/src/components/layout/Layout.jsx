import { Box, VStack } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <VStack minH="100vh" align="stretch" spacing={0}>
      <Header />
      <Box as="main" flex={1} p={4} maxW="1200px" mx="auto" w="100%">
        {children}
      </Box>
      <Footer />
    </VStack>
  );
};

export default Layout;