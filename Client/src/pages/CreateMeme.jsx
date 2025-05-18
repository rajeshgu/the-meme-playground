import { useState, useRef } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
  Tooltip,
  VStack,
  Divider
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { createMeme } from '../api/memes';

export const CreateMeme = () => {
  const { user } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [memeData, setMemeData] = useState({
    title: '',
    image: null,
    topText: '',
    bottomText: '',
    font: 'impact',
    fontSize: 40,
    textColor: '#ffffff',
    tags: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      return toast({
        title: 'Invalid file',
        description: 'Only image files are allowed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast({
        title: 'File too large',
        description: 'Max file size is 5MB.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setMemeData({ ...memeData, image: file });

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast({
        title: 'Login Required',
        description: 'Please log in to create memes.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    if (!memeData.image) {
      return toast({
        title: 'Image Required',
        description: 'Please upload an image to continue.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      for (let key in memeData) {
        if (key === 'fontSize') {
          formData.append(key, memeData[key].toString());
        } else {
          formData.append(key, memeData[key]);
        }
      }

      const token = localStorage.getItem('authToken');
      await createMeme(formData, token);

      toast({
        title: 'Meme Created 🎉',
        description: 'Your meme was successfully uploaded!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setMemeData({
        title: '',
        image: null,
        topText: '',
        bottomText: '',
        font: 'impact',
        fontSize: 40,
        textColor: '#ffffff',
        tags: '',
      });
      setPreview(null);
      fileInputRef.current.value = '';
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Heading textAlign="center" mb={8}>🎨 Create Your Meme</Heading>
      <Flex gap={10} direction={{ base: 'column', lg: 'row' }}>
        {/* Form Panel */}
        <Box flex={1} bg="white" p={6} rounded="md" shadow="md">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Meme title"
                  value={memeData.title}
                  onChange={(e) => setMemeData({ ...memeData, title: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Top Text</FormLabel>
                <Textarea
                  placeholder="Enter top text"
                  value={memeData.topText}
                  onChange={(e) => setMemeData({ ...memeData, topText: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bottom Text</FormLabel>
                <Textarea
                  placeholder="Enter bottom text"
                  value={memeData.bottomText}
                  onChange={(e) => setMemeData({ ...memeData, bottomText: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Font</FormLabel>
                <Select
                  value={memeData.font}
                  onChange={(e) => setMemeData({ ...memeData, font: e.target.value })}
                >
                  <option value="impact">Impact</option>
                  <option value="arial">Arial</option>
                  <option value="comic-sans">Comic Sans</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Font Size: {memeData.fontSize}px</FormLabel>
                <Slider
                  min={20}
                  max={80}
                  value={memeData.fontSize}
                  onChange={(val) => setMemeData({ ...memeData, fontSize: val })}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>

              <FormControl>
                <FormLabel>Text Color</FormLabel>
                <Input
                  type="color"
                  w="80px"
                  p={0}
                  value={memeData.textColor}
                  onChange={(e) => setMemeData({ ...memeData, textColor: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Tags (comma separated)</FormLabel>
                <Input
                  placeholder="funny, cat, fail"
                  value={memeData.tags}
                  onChange={(e) => setMemeData({ ...memeData, tags: e.target.value })}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                isLoading={isLoading}
                loadingText="Uploading..."
              >
                Create Meme
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Preview Panel */}
        <Box flex={1} bg="gray.50" p={4} rounded="md" shadow="md">
          <Text fontWeight="bold" mb={3}>
            Meme Preview
          </Text>
          {preview ? (
            <Box position="relative">
              <Image src={preview} alt="preview" w="100%" borderRadius="md" />
              {memeData.topText && (
                <Text
                  position="absolute"
                  top="10px"
                  left="0"
                  right="0"
                  textAlign="center"
                  color={memeData.textColor}
                  fontFamily={memeData.font}
                  fontSize={`${memeData.fontSize}px`}
                  textShadow="2px 2px 4px #000"
                >
                  {memeData.topText}
                </Text>
              )}
              {memeData.bottomText && (
                <Text
                  position="absolute"
                  bottom="10px"
                  left="0"
                  right="0"
                  textAlign="center"
                  color={memeData.textColor}
                  fontFamily={memeData.font}
                  fontSize={`${memeData.fontSize}px`}
                  textShadow="2px 2px 4px #000"
                >
                  {memeData.bottomText}
                </Text>
              )}
            </Box>
          ) : (
            <Box
              border="2px dashed"
              borderColor="gray.300"
              p={10}
              borderRadius="md"
              textAlign="center"
              color="gray.500"
            >
              Upload an image to preview your meme
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateMeme;
