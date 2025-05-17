import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllMemes } from '../api/memes';
import MemeFeed from '../components/memes/MemeFeed';
import { useMeme } from '../context/MemeContext';

const Home = () => {
  const { memes, setMemes, sortBy, setSortBy } = useMeme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMemes = async () => {
      setIsLoading(true);
      try {
        const params = {};
        if (sortBy === 'top-day') {
          params.sort = '-votes';
          params.timeframe = 'day';
        } else if (sortBy === 'top-week') {
          params.sort = '-votes';
          params.timeframe = 'week';
        } else if (sortBy === 'top-all') {
          params.sort = '-votes';
        } else {
          params.sort = '-createdAt';
        }

        const data = await getAllMemes(params);
        setMemes(data);
      } catch (error) {
        console.error('Failed to fetch memes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemes();
  }, [sortBy, setMemes]);

  return (
    <Box>
      <Heading mb={6} size="xl">
        MemeHub
      </Heading>

      <Tabs
        variant="enclosed"
        isFitted
        onChange={(index) => {
          const sortOptions = ['new', 'top-day', 'top-week', 'top-all'];
          setSortBy(sortOptions[index]);
        }}
        defaultIndex={0}
      >
        <TabList mb={4}>
          <Tab>New</Tab>
          <Tab>Top (24h)</Tab>
          <Tab>Top (Week)</Tab>
          <Tab>Top (All Time)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <MemeFeed memes={memes} isLoading={isLoading} />
          </TabPanel>
          <TabPanel p={0}>
            <MemeFeed memes={memes} isLoading={isLoading} />
          </TabPanel>
          <TabPanel p={0}>
            <MemeFeed memes={memes} isLoading={isLoading} />
          </TabPanel>
          <TabPanel p={0}>
            <MemeFeed memes={memes} isLoading={isLoading} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Home;