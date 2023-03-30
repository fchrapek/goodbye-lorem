import { useState } from 'react';
import {
  Container,
  Box,
  Flex,
  CircularProgress,
  Heading,
} from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Settings from '../components/Settings';

const App = () => {
  const [dummyDataHtml, setDummydataHtml] = useState({ __html: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const passSettings = async (websiteDescription, sections) => {
    setLoading(true);
    setIsVisible(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Make dummy text content that will be used in a mockup website according to provided information. Previously the industry standard was the 'Lorem ipsum' text, but we want to make this process much better.

        This is the general website niche and short description: ${websiteDescription} and those are the sections that the user needs the dummy content for: ${sections}. The order of the sections should reflect the usual order of any live website (Hero section is usually at the top, Footer is at the bottom, etc.) Clearly split the response into sections. Wrap the section content into correct HTML tags. Section titles should be wrapped in the <h2> tag, Features heading and FAQ questions should be wrapped in a <strong> tag. Don't pass any HTML tags as a string, the user can't see any raw HTML tags displayed.

        If the Features, Testimonials or FAQ section were selected, make at least 6 examples. The Features should have the feature heading and short description. The FAQ section should have question and answer.

        Make the response in the same language as the provided description: ${websiteDescription} (if the ${websiteDescription} is in English the whole response should be in English and so on). Translate the section titles as well, meaning these sections: ${sections}

        Only include these sections: ${sections}. So if only Hero section is provided only prepare dummy content for the Hero section (and so on). Don't provide data for sections that are not listed

        Don't ever start the response with a single word or a single dot. The first text of the provided data should always be the heading of the selected section`,
        temperature: 0.2,
        max_tokens: 3500,
        frequency_penalty: 0.8,
      }),
    };

    const response = await fetch(import.meta.env.VITE_OPENAI_URL, options);
    const json = await response.json();
    const data = json.choices[0].text;

    setDummydataHtml(data);
    setLoading(false);
  };

  const createMarkup = (data) => ({ __html: data });

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100dvh">
      <Container padding="10px" maxW="xl" centerContent>
        <Header />
        <Settings settings={passSettings} />
        {isVisible && (
          <Box width="100%">
            {loading ? (
              <Box width="100%" textAlign="center">
                <CircularProgress marginTop="20px" isIndeterminate />
              </Box>
            ) : (
              <Box
                padding={{ sm: '16px', md: '26px' }}
                bg="white"
                borderRadius="8px"
                marginTop="40px"
              >
                <Heading
                  as="h2"
                  marginTop={0}
                  marginBottom="20px"
                  fontSize="30px"
                  textAlign="center"
                  borderBottom="none"
                >
                  Grab the content
                </Heading>
                <Box dangerouslySetInnerHTML={createMarkup(dummyDataHtml)} />
              </Box>
            )}
          </Box>
        )}
        <Footer />
      </Container>
    </Flex>
  );
};

export default App;
