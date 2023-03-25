import { useState } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Flex,
  Input,
  Textarea,
  CheckboxGroup,
  Stack,
  Checkbox,
  Button,
  useToast,
} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
const Settings = ({ settings }) => {
  const [text, setText] = useState('');
  const [radio, setRadio] = useState('');

  const toast = useToast();

  const submitSettings = () => {
    if (text === '') {
      toast({
        title: 'Text field is empty',
        description: 'Put something in here',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      settings(text, radio);
    }
  };

  return (
    <Box marginTop="20px" padding="12px" bg="white" borderRadius="8px">
      <Input
        marginBottom="10px"
        placeholder="Describe your website"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <CheckboxGroup colorScheme="green">
        <Stack spacing={[1, 5]} direction={['column', 'row']}>
          <Checkbox onChange={(e) => setRadio(e.target.value)} value="hero">
            Hero
          </Checkbox>
        </Stack>
      </CheckboxGroup>
      <Button
        bg="blue.500"
        marginTop="20px"
        color="white"
        width="100%"
        _hover={{ bg: 'blue.700' }}
        onClick={submitSettings}
      >
        Get the proper dummy text
      </Button>
    </Box>
  );
};

export default Settings;
