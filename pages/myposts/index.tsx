import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import useSWR, { SWRConfig } from 'swr';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from '@chakra-ui/react';
import { FiRefreshCcw } from 'react-icons/fi';
import { useAuth } from '../../providers/auth/AuthProvider';
import Navbar from '../../components/Navbar';
import NavbarProfile from '../../components/NavbarProfile';
import CopyButton from '../../components/CopyButton';
import PostLibrary from '../../components/PostLibrary';
import { PostsApiResponse } from '../api/posts';
import { userState } from '../../store/store';
import fetchJson from '../../lib/fetchJson';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const getServerSideProps = () => {
  const postsJson = JSON.parse(JSON.stringify([]));
  const postsApiResponse: PostsApiResponse = {
    success: true,
    data: {
      posts: postsJson,
    },
  };
  return {
    props: {
      fallback: {
        '/api/posts': postsApiResponse,
      },
    },
  };
};

const MyPostPage: NextPage = ({ fallback }) => {
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);
  const {
    logOut,
    refreshSession,
    isAuthenticated,
    accessToken,
    refreshToken,
  } = useAuth();
  const [currentUser] = useRecoilState(userState);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://frontend-test-be.stage.thinkeasy.cz/posts/user/${currentUser.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title.trim() === '') {
      toast.warning('Title is not available.', {
        autoClose: 3000,
      });
      return;
    }
    if (formData.content.trim() === '') {
      toast.warning('Content is not available.', {
        autoClose: 3000,
      });
      return;
    }
    try {
      const response = await fetch(
        'https://frontend-test-be.stage.thinkeasy.cz/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      toast.success("Successfully Added", {
        autoClose: 3000,
      });
      setFormData({ title: '', content: '' });
      fetchData();
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error:', error);
    }
  };

  return (
    <SWRConfig value={{ fallback }}>
      <Navbar
        homeURL="/"
        allPostUrl="/allposts"
        myPostUrl="/myposts"
        rightComponent={
          currentUser && [
            <NavbarProfile
              currentUser={currentUser}
              onLogOut={() => {
                logOut();
                router.push('/');
              }}
              key="avatar"
            />,
          ]
        }
      />
      <Box marginTop={'60px'} p={6}>
        <Box display="flex" justifyContent="center">
          <Heading>My POSTS</Heading>
        </Box>
        <Box display="flex" justifyContent="flex-between">
          <form onSubmit={handleSubmit} style={{ width: '40%' }}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                type="text"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Add Post
            </Button>
          </form>
          <Box style={{ width: '60%' }}>
            {isLoading ? (
              <Spinner size="xl" />
            ) : (
              <Accordion allowMultiple>
                {posts.map((post) => (
                  <AccordionItem key={post.id}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {post.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <p>{post.content}</p>
                      <p>Author: {post.authorId}</p>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </SWRConfig>
  );
};

export default MyPostPage;