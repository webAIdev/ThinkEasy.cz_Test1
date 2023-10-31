import {
  Box,
  Input,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from '@chakra-ui/react';
import { InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useAuth } from '../../providers/auth/AuthProvider';
import useSWR, { SWRConfig } from 'swr';
import Navbar from '../../components/Navbar';
import NavbarProfile from '../../components/NavbarProfile';
import { userState } from '../../store/store';
import fetchJson from '../../lib/fetchJson';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const AllPostPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  fallback,
}) => {
  const [currentUser] = useRecoilState(userState);
  const router = useRouter();
  const {
    logOut,
    refreshSession,
    isAuthenticated,
    accessToken,
    refreshToken,
  } = useAuth();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: fetchedPosts, error } = useSWR("https://frontend-test-be.stage.thinkeasy.cz/posts", fetchJson);

  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  if (error) {
    Sentry.captureException(error); // Capture and send the error to Sentry
    return <div>Error fetching posts</div>;
  }

  if (!fetchedPosts) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  // log out
                  logOut();
                  // redirect to home page
                  router.push('/');
                }}
                key="avatar"
              />,
            ]
          }
        />
        <Box marginTop={'60px'} p={6}>
          <Box display="flex" justifyContent="center">
            <Heading>ALL POSTS</Heading>
          </Box>
          <Box mb={4} display="flex" justifyContent="flex-end">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              width="300px"
              position="relative"
              mb={4}
            />
          </Box>
          <Accordion allowMultiple>
            {filteredPosts.map((post) => (
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
        </Box>
      </SWRConfig>
    </Sentry.ErrorBoundary>
  );
};

export default AllPostPage;