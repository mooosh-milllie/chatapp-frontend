import {createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export const AccountContext = createContext();

const UserContext = ({children}) => {
  const [user, setUser] = useState({loggedIn: null});
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:4000/auth/login', {
      credentials: 'include',
    }).catch(err => {
      console.log('Catch Err', err)
      setUser({loggedIn: false})
      return
    }).then(res => {
      if (!res?.ok || !res.status >= 400) {
        console.log('Response Err')
        return setUser({loggedIn: false});
      }
      return res.json();
    }).then(data => {
      if(!data) return setUser({loggedIn: false});
      console.log('Data don reach', data)
      setUser({...data});
      navigate('/home')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <AccountContext.Provider value={{ user, setUser }} >
      {children}
    </AccountContext.Provider>
  )
}

export default UserContext;