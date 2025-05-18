import {
  Box,
  Flex,
  Text,
  Link,
  Stack,
  Divider,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const bg = useColorModeValue('gray.900', 'gray.800');
  const text = useColorModeValue('gray.300', 'gray.400');
  const hover = useColorModeValue('purple.400', 'purple.300');

  return (
    <Box as="footer" bg={bg} color={text} mt={10} pt={10}>
      {/* Top Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        maxW="1200px"
        mx="auto"
        px={6}
        pb={10}
        gap={10}
        wrap="wrap"
      >
        {/* Brand Info */}
        <Box flex="1" minW="250px">
          <Text fontSize="2xl" fontWeight="bold" color="white" mb={2}>
            MemeHub 🎭
          </Text>
          <Text fontSize="sm">
            MemeHub is your go-to creative studio for generating hilarious, shareable, and viral memes in seconds.
            Unleash your creativity, customize your humor, and join a community that lives to laugh.
          </Text>
        </Box>

        {/* Link Groups */}
        <Flex flex="2" justify="space-around" flexWrap="wrap" gap={8}>
          <Stack spacing={3}>
            <Text fontWeight="bold" color="white">
              Explore
            </Text>
            <Link href="/" _hover={{ color: hover }}>Home</Link>
            <Link href="/create" _hover={{ color: hover }}>Create Meme</Link>
            <Link href="/gallery" _hover={{ color: hover }}>Trending Memes</Link>
          </Stack>

          <Stack spacing={3}>
            <Text fontWeight="bold" color="white">
              Legal
            </Text>
            <Link href="/terms" _hover={{ color: hover }}>Terms of Use</Link>
            <Link href="/privacy" _hover={{ color: hover }}>Privacy Policy</Link>
          </Stack>

          <Stack spacing={3}>
            <Text fontWeight="bold" color="white">
              Support
            </Text>
            <Link href="/contact" _hover={{ color: hover }}>Contact</Link>
            <Link href="/about" _hover={{ color: hover }}>About Us</Link>
            <Link href="mailto:support@memehub.fun" _hover={{ color: hover }}>Email Support</Link>
          </Stack>
        </Flex>
      </Flex>

      <Divider borderColor="gray.700" />

      {/* Bottom Section */}
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={6}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Text fontSize="sm" color="gray.500" textAlign="center">
          © {new Date().getFullYear()} MemeHub. Crafted with ❤️ by Code Commandos.
        </Text>

        <Flex gap={4} align="center">
          <Link href="/about" _hover={{ textDecoration: 'underline' }}>About</Link>
          <Link href="/terms" _hover={{ textDecoration: 'underline' }}>Terms</Link>
          <Link href="/privacy" _hover={{ textDecoration: 'underline' }}>Privacy</Link>
          <Link href="/contact" _hover={{ textDecoration: 'underline' }}>Contact</Link>
        </Flex>

        <Flex gap={3}>
          <IconButton
            as="a"
            href="https://github.com"
            aria-label="GitHub"
            icon={<FaGithub />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          <IconButton
            as="a"
            href="https://instagram.com"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
