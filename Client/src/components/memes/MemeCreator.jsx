import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createMeme } from '../../api/memes';
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
} from '@chakra-ui/react';

const MemeCreator = () => {
  const { user } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [memeData, setMemeData] = useState({
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
    if (file) {
      setMemeData({ ...memeData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', memeData.image);
    formData.append('topText', memeData.topText);
    formData.append('bottomText', memeData.bottomText);
    formData.append('font', memeData.font);
    formData.append('fontSize', memeData.fontSize);
    formData.append('textColor', memeData.textColor);
    formData.append('tags', memeData.tags);

    try {
      await createMeme(formData);
      toast({
        title: 'Meme created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Reset form
      setMemeData({
        image: null,
        topText: '',
        bottomText: '',
        font: 'impact',
        fontSize: 40,
        textColor: '#ffffff',
        tags: '',
      });
      setPreview(null);
    } catch (error) {
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
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box flex={1}>
          <FormControl mb={4}>
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
              onChange={(e) =>
                setMemeData({ ...memeData, topText: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Bottom Text</FormLabel>
            <Textarea
              value={memeData.bottomText}
              onChange={(e) =>
                setMemeData({ ...memeData, bottomText: e.target.value })
              }
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Font</FormLabel>
            <Select
              value={memeData.font}
              onChange={(e) => setMemeData({ ...memeData, font: e.target.value })}
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
              onChange={(value) => setMemeData({ ...memeData, fontSize: value })}
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
              onChange={(e) =>
                setMemeData({ ...memeData, textColor: e.target.value })
              }
              w="100px"
              p={0}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Tags (comma separated)</FormLabel>
            <Input
              value={memeData.tags}
              onChange={(e) => setMemeData({ ...memeData, tags: e.target.value })}
              placeholder="funny, dank, relatable"
            />
          </FormControl>

          <Button
            colorScheme="purple"
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={!memeData.image}
          >
            Create Meme
          </Button>
        </Box>

        <Box flex={1}>
          <Text mb={2} fontWeight="bold">
            Preview
          </Text>
          {preview ? (
            <Box position="relative" border="1px" borderColor="gray.200" p={2}>
              <Image src={preview} alt="Meme preview" w="100%" />
              {memeData.topText && (
                <Text
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
                </Text>
              )}
              {memeData.bottomText && (
                <Text
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
                </Text>
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
              <Text>Upload an image to see preview</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default MemeCreator;