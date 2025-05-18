import {
  Flex,
  Heading,
  Link,
  Box,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../api/auth';
import { FaPlus, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { user, logout: contextLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      contextLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const bg = useColorModeValue('purple.500', 'purple.600');
  const linkHover = useColorModeValue('purple.300', 'purple.200');

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={{ base: 4, md: 8 }}
      py={3}
      bg={bg}
      color="white"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Logo */}
      <Link
        as={RouterLink}
        to="/"
        _hover={{ textDecoration: 'none' }}
        fontWeight="bold"
        fontSize="2xl"
        display="flex"
        alignItems="center"
        transition="transform 0.3s ease"
        hover={{ transform: 'scale(1.05)', color: 'yellow.300' }}
      >
        🎭 MemeHub
      </Link>

      {/* Navigation Links */}
      <HStack spacing={5} align="center">
        <Link
          as={RouterLink}
          to="/explore"
          fontWeight="medium"
          _hover={{ color: linkHover }}
        >
          Explore
        </Link>

        {user ? (
          <>
            <Link
              as={RouterLink}
              to="/create"
              fontWeight="medium"
              display="flex"
              alignItems="center"
              gap={1}
              _hover={{ color: linkHover }}
            >
              <Icon as={FaPlus} />
              Create
            </Link>

            {/* User Menu */}
            <Menu>
              <MenuButton>
                <Avatar
                  name={user.username}
                  size="sm"
                  cursor="pointer"
                  border="2px solid white"
                />
              </MenuButton>
              <MenuList color="gray.700">
                <MenuItem icon={<FaUserCircle />} as={RouterLink} to="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Link
              as={RouterLink}
              to="/login"
              fontWeight="medium"
              _hover={{ color: linkHover }}
            >
              Login
            </Link>
            <Button
              as={RouterLink}
              to="/register"
              size="sm"
              colorScheme="whiteAlpha"
              bg="whiteAlpha.300"
              _hover={{ bg: 'whiteAlpha.500' }}
            >
              Register
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Header;
