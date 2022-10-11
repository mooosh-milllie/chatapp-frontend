import { Box, TabPanel, TabPanels, Text, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import ChatBox from './ChatBox';
import { FriendContext, MessagesContext } from './Home';
// import {differenceInDays} from 'date-fns';


const Chat = ({userid}) => {
  const {friendList} = useContext(FriendContext)
  const {messages} = useContext(MessagesContext);
  const bottomDiv = useRef(null);
  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  })
  return friendList.length > 0 ? (
    <VStack height={'100%'} justify='end'>
      <TabPanels overflowY={'scroll'}>
        {
          friendList.map((friend, index) => {
            return (
              <VStack 
              flexDir={'column-reverse'}
              as={TabPanel} 
              key={`chat:${friend.username}${friend.userid}`}
              w='100%'
              >
                <div ref={bottomDiv}></div>
                {
                messages.filter((msg) => msg.to === friend.userid || msg.from === friend.userid)
                .map((message, index) => {
                  const msgTime = new Date(message.time);
                  // const msgDate = differenceInDays(new Date(), msgTime);
                  // const options = { year: 'numeric', month: 'long', day: 'numeric'};
                  // const navLocale = navigator.language;
                  // const formatDtate = new Date(message.time).toLocaleDateString(navLocale, options)
                  const getMin = msgTime.getMinutes();
                  const formatGetMin = getMin < 10 ? '0'+getMin : getMin;

                  const msgHourMin = `${msgTime.getHours()}:${formatGetMin}:${msgTime.getHours() >= 12 ? "PM" : "AM"}`;
                  return (
                    <Box key={`msg:${friend.username}.${msgTime}`} 
                    bg={message.to === friend.userid ? 'blue.100' : 'gray.100'}
                    borderRadius='10px'
                    maxWidth={'50%'}
                    color='gray.800'
                    p='0.5rem 1rem'
                    m={message.to === friend.userid ? '1rem 0 0 auto !important' : '1rem auto 0 0 !important'}
                    >
                      {/* <Text>{msgDate < 1 ? 'Today' : msgDate === 1 ? 'Yesterday' : 'dis week sha'}</Text> */}
                      <Text fontSize='md'>{message.content}</Text>
                      <Text fontSize={'10px'} textAlign='end'>{msgHourMin}</Text>
                    </Box>
                  )
                })}
              </VStack>
            )
          })
        }
      </TabPanels>
      <ChatBox userid={userid}/>
    </VStack>
    
  ) : (
    <VStack>
      <Text marginTop={'4rem'} fontSize='4xl'>No friends :( Add Friends to start chatting</Text>
    </VStack>
  )
}

export default Chat;