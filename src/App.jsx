import React from 'react';
import { Container, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/Settings';

const App = () => {
  const passSettings = (text, radio) => {
    console.log(text, radio);
  };

  return (
    <Box bg="gray.200" color="222" height="100vh" paddingTop="130px">
      <Container maxW="3xl" centerContent>
        <Header />
        <Settings settings={passSettings} />
        <Footer />
      </Container>
    </Box>
  );
};

export default App;
