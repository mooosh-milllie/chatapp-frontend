import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useCallback, useContext, useState } from 'react'
import TextField from '../subcomponents/TextField';
import { addFriendSchema } from '../utils/validationSchema';
import socket from '../../socket';
import { FriendContext } from './Home';

const AddFriendModal = ({isOpen, onClose}) => {
  const [error, setError] = useState('');
  const closeModal = useCallback(
    () => {
      setError('');
      onClose()
    },
    [onClose]
  )
  const {setFriendList} = useContext(FriendContext);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Add Friend</ModalHeader>
        <ModalCloseButton/>
          <Formik
          initialValues={{ username: '' }}
          validationSchema={addFriendSchema}
          onSubmit={
            (values, actions) => {
              socket.emit('add_friend', values.username, ({errorMessage, done, newFriend}) => {
                if (done) {
                  console.log(newFriend)
                  setFriendList((friends) => [newFriend, ...friends]);
                  closeModal();
                  return;
                }
                setError(errorMessage);
              });
              actions.resetForm();
            }
          }
          >
            <Form>
              <ModalBody>
                <Heading as={'p'} fontSize='sm' color={'red.500'} textAlign='center'>
                  {error}
                </Heading>
                <TextField label={'Friend\'s Username'}
                autoComplete='off' 
                name='username'
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme={'blue'} type='submit'>submit</Button>
              </ModalFooter>
            </Form>
          </Formik>
      </ModalContent>
    </Modal>
  )
}

export default AddFriendModal;