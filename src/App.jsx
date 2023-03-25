import { useState } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/Settings';

const App = () => {
  const [dummyData, setDummydata] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const passSettings = async (text, radio) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Make dummy text content that will be used in a mockup webiste according to provided information. This is the general website niche: ${text} and those are the sections that the user needs the dummy content for: ${radio}. Split the response into sections, starting each section with a header that represent selected sections`,
        temperature: 0.5,
        max_tokens: 300,
        frequency_penalty: 0.8,
      }),
    };

    const response = await fetch(import.meta.env.VITE_OPENAI_URL, options);

    const json = await response.json();

    // const data = json.choices[0].text.trim();

    console.log(json);
    // setDummydata(data);
    // setLoading(false);
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
