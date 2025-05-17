import { Flex, Heading, Link, Box, Button, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Flex as="header" align="center" justify="space-between" p={4} bg="purple.500" color="white">
      <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
        <Heading size="lg">MemeHub</Heading>
      </Link>

      <Flex align="center" gap={4}>
        <Link as={RouterLink} to="/explore" _hover={{ textDecoration: 'underline' }}>
          Explore
        </Link>

        {user ? (
          <>
            <Link as={RouterLink} to="/create" _hover={{ textDecoration: 'underline' }}>
              Create
            </Link>
            <Menu>
              <MenuButton as={Button} variant="ghost" p={0}>
                <Avatar name={user.username} size="sm" />
              </MenuButton>
              <MenuList color="black">
                <MenuItem as={RouterLink} to="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Link as={RouterLink} to="/login" _hover={{ textDecoration: 'underline' }}>
              Login
            </Link>
            <Link as={RouterLink} to="/register" _hover={{ textDecoration: 'underline' }}>
              Register
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;