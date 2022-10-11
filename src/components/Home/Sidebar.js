import { ChatIcon } from '@chakra-ui/icons';
import { Button, Circle, Divider, HStack, Tab, TabList, Text, useDisclosure, VStack, Icon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import AddFriendModal from './AddFriendModal';
import {HiUserGroup} from 'react-icons/hi';
import { FriendContext } from './Home';
import CreateGroupModal from './CreateGroupModal';


const Sidebar = () => {
  const {friendList} = useContext(FriendContext);
  const addFriend = useDisclosure();
  const createGroup = useDisclosure();
  return (
    <>
      <VStack py='1.5rem'>
        <HStack justify={'space-evenly'} w='100%'>
          <Text>Add Friends</Text>
          <Button onClick={addFriend.onOpen}>
            <ChatIcon />
          </Button>
          <Text>Create Group</Text>
          <Button onClick={createGroup.onOpen}>
            <Icon as={HiUserGroup} />
          </Button>
        </HStack>
        <Divider/>
        <VStack as={TabList}>
          {
            friendList.map((friend) => {
              // Friend sends inconsistent values for connected status, it evalutes to boolean or string
              // So these lines converts to boolean
              let connected;
              if (friend.connected === 'true' || friend.connected === true) {
                connected = true
              } else {
                connected = false;
              }
              return (
                <HStack as={Tab} key={`friends:${friend.username}`}>
                  <Circle w='15px' h='15px' bg={connected ? 'green.700' : 'red.500'}/>
                  <Text>{friend.username}</Text>
                </HStack>
              )
            })
          }
        </VStack>
      </VStack>
      <CreateGroupModal isOpen={createGroup.isOpen} onClose={createGroup.onClose}/>
      <AddFriendModal  isOpen={addFriend.isOpen} onClose={addFriend.onClose}/>
    </>
    
  )
}

export default Sidebar;