import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "../AccountContext";
import TextField from "../subcomponents/TextField";
import { signUpSchema } from "../utils/validationSchema";


const Login = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(AccountContext);
  const [error, setError] = useState(null);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={signUpSchema}
      onSubmit={(values, actions) => {
        const vals = {...values};
        console.log(vals)
        fetch('http://localhost:4000/auth/register', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(vals)
        }).catch(err => {
          console.log(err)
          return;
        }).then(res => {
          if (!res?.ok || res.status >= 400) {
            return;
          }
          return res.json();
        }).then(data => {
          console.log(data)
          if (!data) return;
          setUser({...data})
          if (data.status) {
            setError(data.status)
          }
          if (data.loggedIn) {
            navigate('/home');            
          }
        })
        actions.resetForm();
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Sign Up</Heading>
        <Text as={'p'} color='red.500'>{error}</Text>
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />

        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="Password"
          type="password"
        />

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Sign Up
          </Button>
          <Button onClick={() => navigate("/")}>Or Login</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

export default Login;