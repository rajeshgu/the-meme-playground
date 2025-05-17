import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, defaultTab = 0 }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to MemeHub</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Tabs defaultIndex={defaultTab} isFitted variant="enclosed">
            <TabList mb={4}>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <LoginForm onSuccess={onClose} />
              </TabPanel>
              <TabPanel px={0}>
                <RegisterForm onSuccess={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;