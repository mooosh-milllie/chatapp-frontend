import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext.js";
import Home from "./Home/Home.js";
import Login from "./Login/Login.js";
import SignUp from "./Login/SignUp";
import PrivateRoute from "./PrivateRoute.js";

const Views = () => {
  const {user} = useContext(AccountContext);

  return user.loggedIn === null ? "" :(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoute/>}>
        <Route path="/home" element={<Home/>}/>
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;