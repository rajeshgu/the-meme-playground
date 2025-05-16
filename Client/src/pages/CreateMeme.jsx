import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import memesAPI from '../api/memes';
import MemeCreator from '../components/meme/MemeCreator';
import { toast } from 'react-toastify';

const CreateMeme = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (memeDataURL) => {
    if (!token) {
      toast.error('You need to be logged in to create memes');
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert base64 to blob for smaller payload
      const blob = await fetch(memeDataURL).then(res => res.blob());
      
      const formData = new FormData();
      formData.append('title', 'My Awesome Meme');
      formData.append('image', blob, 'meme.png');
      
      await memesAPI.createMeme(formData, token);
      toast.success('Meme created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create meme');
      console.error('Meme creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create Your Meme</h1>
      <MemeCreator onSave={handleSave} />
    </div>
  );
};

export default CreateMeme;