import { Button, HStack, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import socket from '../../socket';
import * as Yup from 'yup';
import {MessagesContext} from '../Home/Home';

const ChatBox = ({userid}) => {
  const {setMessages} = useContext(MessagesContext);
  return (
    <Formik
    initialValues={{ message: '' }}
    validationSchema={Yup.object({
      message: Yup.string().min(1).max(255).required()
    })}
    onSubmit={(values, action) => {
      const message = {to: userid, from: null, content: values.message, time: new Date().toISOString()}
      socket.emit('directMessage', message)
      setMessages(prevMsg => [message, ...prevMsg]);
      action.resetForm();
    }}
    >
      <HStack as={Form} pb='1.5rem' w={'90%'}>
        <Input as={Field} name='message' placeholder='Type message here...' size='lg' autoComplete='off'/>
        <Button type='submit' size='lg' fontSize={'md'} colorScheme='teal'>send message</Button>
      </HStack>

    </Formik>
  )
}

export default ChatBox;