import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useCallback, useContext, useState } from 'react'
import TextField from '../subcomponents/TextField';
import { createGroupSchema } from '../utils/validationSchema';
import socket from '../../socket';
import { FriendContext } from './Home';

const CreateGroupModal = ({isOpen, onClose}) => {
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
        <ModalHeader>Create Group</ModalHeader>
        <ModalCloseButton/>
          <Formik
          initialValues={{ groupname: '' }}
          validationSchema={createGroupSchema}
          onSubmit={
            (values, actions) => {
              socket.emit('add_friend', values.groupname, ({errorMessage, done, groupname}) => {
                if (done) {
                  // console.log(newFriend)
                  // setFriendList((friends) => [newFriend, ...friends]);
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
                <TextField label={'Group name'}
                autoComplete='off' 
                name='groupname'
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme={'blue'} type='submit'>create group</Button>
              </ModalFooter>
            </Form>
          </Formik>
      </ModalContent>
    </Modal>
  )
}

export default CreateGroupModal;