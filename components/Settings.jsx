import { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Input,
  Checkbox,
  Button,
  useToast,
} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const Settings = ({ settings }) => {
  const [websiteDescription, setWebsiteDescription] = useState('');
  const [sections, setSections] = useState([]);
  const toast = useToast();

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSections((pre) => [...pre, value]);
    } else
      setSections((pre) => [...pre.filter((element) => element !== value)]);
  };

  if (sections.length > 0) {
    sections.join(', ');
  }

  const submitSettings = () => {
    if (websiteDescription === '') {
      toast({
        title: 'Website description cannot be empty',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      settings(websiteDescription, sections);
    }
  };

  return (
    <Box
      marginTop="20px"
      padding={{ sm: '16px', md: '26px' }}
      bg="white"
      borderRadius="8px"
      width="100%"
    >
      <Input
        marginBottom="20px"
        placeholder="Briefly describe your website"
        value={websiteDescription}
        onChange={(e) => setWebsiteDescription(e.target.value)}
      />
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        spacingX="40px"
        spacingY="12px"
        marginBottom="20px"
      >
        <Checkbox onChange={handleChange} value="hero">
          Hero
        </Checkbox>
        <Checkbox onChange={handleChange} value="paragraph">
          Paragraph
        </Checkbox>
        <Checkbox onChange={handleChange} value="call to action">
          Call to action paragraph
        </Checkbox>
        <Checkbox onChange={handleChange} value="catchy slogan">
          Catchy slogan
        </Checkbox>
        <Checkbox onChange={handleChange} value="features">
          Features
        </Checkbox>
        <Checkbox onChange={handleChange} value="faq">
          FAQ
        </Checkbox>
        <Checkbox onChange={handleChange} value="footer">
          Footer
        </Checkbox>
      </SimpleGrid>

      <Button
        bg="blue.500"
        color="white"
        width="100%"
        _hover={{ bg: 'blue.700' }}
        onClick={submitSettings}
      >
        Get dummy text for your mockup
      </Button>
    </Box>
  );
};

export default Settings;
