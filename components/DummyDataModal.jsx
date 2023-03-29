import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
} from '@chakra-ui/react';

const DommyDataModal = ({ dummyData, loading, isOpen, closeModal }) => (
  <Modal isOpen={isOpen} onClose={closeModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Dummy data</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {loading ? (
          <CircularProgress isIndeterminate />
        ) : (
          <Box>{dummyData}</Box>
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={closeModal}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DommyDataModal;
