import { useAuth } from '../../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const toast = useToast();

  if (loading) {
    return null; // or a loading spinner
  }

  if (!user) {
    toast({
      title: 'Authentication required',
      description: 'Please login to access this page',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;