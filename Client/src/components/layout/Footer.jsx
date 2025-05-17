import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="purple.500" color="white" py={4} mt={8}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Text mb={{ base: 2, md: 0 }}>© 2023 MemeHub. All rights reserved.</Text>
        <Flex gap={4}>
          <Link href="/about" _hover={{ textDecoration: 'underline' }}>
            About
          </Link>
          <Link href="/terms" _hover={{ textDecoration: 'underline' }}>
            Terms
          </Link>
          <Link href="/privacy" _hover={{ textDecoration: 'underline' }}>
            Privacy
          </Link>
          <Link href="/contact" _hover={{ textDecoration: 'underline' }}>
            Contact
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;