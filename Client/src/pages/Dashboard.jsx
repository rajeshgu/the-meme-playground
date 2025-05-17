import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllMemes } from '../api/memes';
import MemeFeed from '../components/memes/MemeFeed';
import UserStats from '../components/analytics/UserStats';

const Dashboard = () => {
  const { user } = useAuth();
  const [myMemes, setMyMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMyMemes = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const data = await getAllMemes({ userId: user._id });
        console.log('Data from getAllMemes:', data); // Debugging log
        setMyMemes(Array.isArray(data) ? data : []); // Ensure it's always an array
      } catch (error) {
        console.error('Failed to fetch user memes:', error);
        // Consider setting to an empty array here as well, depending on desired UI
        // setMyMemes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyMemes();
  }, [user]);

  return (
    <Box>
      <Heading mb={6} size="xl">
        My Dashboard
      </Heading>

      <Tabs variant="enclosed" isFitted>
        <TabList mb={4}>
          <Tab>My Memes</Tab>
          <Tab>Stats</Tab>
        </TabList>

        <TabPanels>
         <TabPanel p={0}>
  <MemeFeed
    memes={myMemes}
    isLoading={isLoading}
    renderItem={(meme) => {
      console.log('Meme in Dashboard Feed:', meme);
      return <MemeCard meme={meme} />;
    }}
  />
</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;