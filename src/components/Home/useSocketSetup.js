import { useContext, useEffect } from "react"
import socket from "../../socket"
import { AccountContext } from "../AccountContext"

const useSoketSetup = (setFriendList, setMessages) => {
  const {setUser} = useContext(AccountContext);
  useEffect(() => {
    socket.connect();
    socket.on('friends', friendList => {
      setFriendList(friendList);
    })
    socket.on('messages', messages => {
      setMessages(messages);
    })
    socket.on('add_friend',  newFriend => {
        console.log(newFriend)
        setFriendList((friends) => [newFriend, ...friends]);
    });
    socket.on('directMessage', (message) => {
      setMessages(prevMsg => [message, ...prevMsg]);
    })
    socket.on('connected', (status, username) => {
      setFriendList((prevFriends) => {
        const friends = [...prevFriends];
        return friends.map(friend => {
          if (friend.username === username) {
            friend.connected = status
          }
          return friend
        })
      })  
    })
    socket.on('connect_error', () => {
      setUser({loggedIn: false})
    })
    return () => {
      socket.off('connect-error');
      socket.off('connected');
      socket.off('friends');
      socket.off('add_friend');
      socket.off('messages');
      socket.off('directMessage');
    }
  }, [setUser, setFriendList, setMessages])
}

export default useSoketSetup;