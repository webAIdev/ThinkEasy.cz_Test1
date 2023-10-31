import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Divider, Heading, HStack, Text, Tooltip, IconButton } from '@chakra-ui/react';
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR, { SWRConfig } from 'swr';
import { FiRefreshCcw } from 'react-icons/fi';
import CopyButton from '../components/CopyButton';
import Navbar from '../components/Navbar';
import NavbarProfile from '../components/NavbarProfile';
import { useAuth } from '../providers/auth/AuthProvider';
import PostLibrary from '../components/PostLibrary';
import { PostsApiResponse } from './api/posts';
import { userState } from '../store/store';
import fetchJson from '../lib/fetchJson';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to retrieve currentUser from local storage or cookies
const getCurrentUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      return JSON.parse(currentUserData);
    }
  }
  return null;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
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

const HomePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  fallback,
}) => {
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);
  const {
    logOut,
    refreshSession,
    isAuthenticated,
    accessToken,
    refreshToken,
  } = useAuth();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      setCurrentUser(getCurrentUserFromStorage());
    }
  }, [accessToken]);

  useEffect(() => {
    // Check if accessToken is empty and user is authenticated
    // If true, refresh the session to get a new accessToken
    if (!accessToken && isAuthenticated) {
      setIsTokenRefreshing(true);
      refreshSession()
        .then(() => {
          toast.success('Refreshed access token', {
            autoClose: 3000,
          });
        })
        .catch((error) => {
          Sentry.captureException(error);
          toast.error('Failed to refresh access token', {
            autoClose: 3000,
          });
        })
        .finally(() => setIsTokenRefreshing(false));
    }
  }, []);

  const {
    data: posts,
    error,
    mutate,
  } = useSWR<PostsApiResponse>('/api/posts', fetchJson);

  if (error) {
    Sentry.captureException(error);
  }

  Sentry.configureScope((scope) => {
    scope.setUser({ email: currentUser.email });
  });

  return (
    <Sentry.ErrorBoundary fallback={'An error has occurred'}>
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
          <Heading>Your profile</Heading>
          <Divider mb={5} />
          {currentUser ? (
            <>
              <HStack>
                <Text fontWeight={'bold'}>User ID</Text>
                <Text>{currentUser.id}</Text>
              </HStack>
              <HStack>
                <Text fontWeight={'bold'}>Authenticated?</Text>
                <Text>{isAuthenticated ? 'Yes' : 'No'}</Text>
              </HStack>
              <HStack>
                <Text fontWeight={'bold'}>Username:</Text>
                <Text>
                  {currentUser.firstname} {currentUser.lastname}
                </Text>
              </HStack>
              <HStack>
                <Text fontWeight={'bold'}>Email:</Text>
                <Text>{currentUser.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight={'bold'}>Role:</Text>
                <Text>{currentUser.role}</Text>
              </HStack>
              <Heading mt={5}>Token management:</Heading>
              <Divider mb={5} />
              <HStack mt={5} gap={10}>
                <Text fontWeight={'bold'}>Access token:</Text>
                <Text maxWidth={'60%'}>{accessToken}</Text>
                {accessToken && (
                  <CopyButton
                    value={accessToken}
                    label={'Copy access token'}
                    onSuccessfulCopy={() => {
                      toast.success('Copied access token', {
                        autoClose: 3000,
                      });
                    }}
                    onFailedCopy={() => {
                      toast.error('Failed to copy access token', {
                        autoClose: 3000,
                      });
                    }}
                  />
                )}
                <Tooltip hasArrow shouldWrapChildren label={'Refresh access token'}>
                  <IconButton
                    aria-label="Refresh access token"
                    icon={<FiRefreshCcw />}
                    disabled={isTokenRefreshing}
                    onClick={() => {
                      setIsTokenRefreshing(true);
                      refreshSession()
                        .then(() => {
                          toast.success('Refreshed access token', {
                            autoClose: 3000,
                          });
                        })
                        .catch((error) => {
                          Sentry.captureException(error);
                          toast.error('Failed to refresh access token', {
                            autoClose: 3000,
                          });
                        })
                        .finally(() => setIsTokenRefreshing(false));
                    }}
                  />
                </Tooltip>
              </HStack>
              <HStack mt={5} gap={10}>
                <Text fontWeight={'bold'}>Refresh token:</Text>
                <Text maxWidth={'60%'}>{refreshToken}</Text>
                {refreshToken && (
                  <CopyButton
                    value={refreshToken}
                    label={'Copy refresh token'}
                    onSuccessfulCopy={() => {
                      toast.success('Copied refresh token', {
                        autoClose: 3000,
                      });
                    }}
                    onFailedCopy={() => {
                      toast.error('Failed to copy refresh token', {
                        autoClose: 3000,
                      });
                    }}
                  />
                )}
              </HStack>
            </>
          ) : (
            <Text fontSize="xl">You are not logged in</Text>
          )}
        </Box>
      </SWRConfig>
      <ToastContainer />
    </Sentry.ErrorBoundary>
  );
};

export default HomePage;