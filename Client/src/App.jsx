// App.jsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MemeProvider } from './context/MemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import CreateMeme from './pages/CreateMeme';
import MemeDetail from './pages/MemeDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/404';
import ProtectedRoute from './components/ui/ProtectedRoute';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      500: '#6b46c1',
      900: '#1a202c',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/memes/:id" element={<MemeDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateMeme />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </MemeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
