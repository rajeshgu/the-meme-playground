import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { createMeme } from '../api/memes';
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
  Text as ChakraText,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading
} from '@chakra-ui/react';

export const CreateMeme = () => {
  const { user } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
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
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image type
    if (!file.type.match('image.*')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPEG, PNG, etc.)',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 5MB',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setMemeData({ ...memeData, image: file });

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please login to create memes',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!memeData.image) {
      toast({
        title: 'Image required',
        description: 'Please upload an image',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', memeData.title);
      formData.append('image', memeData.image);
      formData.append('topText', memeData.topText);
      formData.append('bottomText', memeData.bottomText);
      formData.append('font', memeData.font);
      formData.append('fontSize', memeData.fontSize.toString());
      formData.append('textColor', memeData.textColor);
      formData.append('tags', memeData.tags);

      // Get the token from the AuthContext
      const token = localStorage.getItem('authToken'); // Assuming you store it in localStorage after login

      // Include the token in the Authorization header
      await createMeme(formData, token); // Pass the token to the createMeme function

      toast({
        title: 'Meme created!',
        description: 'Your meme has been successfully created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form
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
      fileInputRef.current.value = ''; // Clear file input
    } catch (error) {
      console.error('Error creating meme:', error);
      toast({
        title: 'Failed to create meme',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      <Heading mb={6} size="xl" textAlign="center">
        Create a Meme
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box flex={1}>
            <FormControl mb={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={memeData.title}
                onChange={(e) => setMemeData({...memeData, title: e.target.value})}
                placeholder="Enter meme title"
              />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Top Text</FormLabel>
              <Textarea
                value={memeData.topText}
                onChange={(e) => setMemeData({...memeData, topText: e.target.value})}
                placeholder="Enter top text"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Bottom Text</FormLabel>
              <Textarea
                value={memeData.bottomText}
                onChange={(e) => setMemeData({...memeData, bottomText: e.target.value})}
                placeholder="Enter bottom text"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Font</FormLabel>
              <Select
                value={memeData.font}
                onChange={(e) => setMemeData({...memeData, font: e.target.value})}
              >
                <option value="impact">Impact</option>
                <option value="arial">Arial</option>
                <option value="verdana">Verdana</option>
                <option value="comic-sans">Comic Sans</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Font Size: {memeData.fontSize}px</FormLabel>
              <Slider
                min={20}
                max={80}
                value={memeData.fontSize}
                onChange={(value) => setMemeData({...memeData, fontSize: value})}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Text Color</FormLabel>
              <Input
                type="color"
                value={memeData.textColor}
                onChange={(e) => setMemeData({...memeData, textColor: e.target.value})}
                w="100px"
                p={0}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Tags (comma separated)</FormLabel>
              <Input
                value={memeData.tags}
                onChange={(e) => setMemeData({...memeData, tags: e.target.value})}
                placeholder="funny, dank, relatable"
              />
            </FormControl>
          </Box>

          <Box flex={1}>
            <ChakraText fontWeight="bold" mb={2}>
              Preview
            </ChakraText>
            {preview ? (
              <Box position="relative" border="1px" borderColor="gray.200" p={2}>
                <Image src={preview} alt="Meme preview" w="100%" />
                {memeData.topText && (
                  <ChakraText
                    position="absolute"
                    top="10px"
                    left="0"
                    right="0"
                    textAlign="center"
                    fontFamily={memeData.font}
                    fontSize={`${memeData.fontSize}px`}
                    color={memeData.textColor}
                    textShadow="2px 2px 4px #000000"
                    p={2}
                  >
                    {memeData.topText}
                  </ChakraText>
                )}
                {memeData.bottomText && (
                  <ChakraText
                    position="absolute"
                    bottom="10px"
                    left="0"
                    right="0"
                    textAlign="center"
                    fontFamily={memeData.font}
                    fontSize={`${memeData.fontSize}px`}
                    color={memeData.textColor}
                    textShadow="2px 2px 4px #000000"
                    p={2}
                  >
                    {memeData.bottomText}
                  </ChakraText>
                )}
              </Box>
            ) : (
              <Box
                border="1px dashed"
                borderColor="gray.300"
                p={8}
                textAlign="center"
                borderRadius="md"
              >
                <ChakraText>Upload an image to see preview</ChakraText>
              </Box>
            )}
          </Box>
        </Flex>

        <Button
          type="submit"
          colorScheme="purple"
          isLoading={isLoading}
          isDisabled={!memeData.image}
          mt={4}
          w="full"
        >
          Create Meme
        </Button>
      </form>
    </Box>
  );
};

export default CreateMeme;