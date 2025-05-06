import { Box, Button, Card, Center, Checkbox, Container, Field, FieldErrorText, Input, Stack, Toast } from "@chakra-ui/react";
import { JSX } from "@emotion/react/jsx-runtime";
import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify"

export default function SignUp(): JSX.Element{
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
    const navigate = useNavigate()
    
    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const username = document.getElementById('username') as HTMLInputElement;
        let isValid = true;
    
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
          setEmailError(true);
          setEmailErrorMessage('Please enter a valid email address.');
          isValid = false;
        } else {
          setEmailError(false);
          setEmailErrorMessage('');
        }

        if(!username.value || !/^[a-zA-Z0-9_+]+$/.test(username.value)){
            setUsernameError(true);
            setUsernameErrorMessage("Please enter only numbers/letters");
            isValid = false;
        } else{
            setUsernameError(false);
            setUsernameErrorMessage('');
        }
    
        if (!password.value || password.value.length < 6) {
          setPasswordError(true);
          setPasswordErrorMessage('Password must be at least 6 characters long.');
          isValid = false;
        } else {
          setPasswordError(false);
          setPasswordErrorMessage('');
        }
    
        return isValid;
      };

    const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
        const response = await AuthService.registration({email, username, password});
        if(response){
            toast.success("Successful")
        }
    } catch (error) {
        console.error('Login failed:', error);
        toast.error("Error")
    }
        // console.log(role);
        
  
    };






    return (
            <Box maxW={'full'} display={'flex'} justifyContent={'center'}>
                <Card.Root maxW={"600px"} bgColor={"gray.800"} borderColor={"gray.700"} onClick={validateInputs}>
                <Card.Body>
                    <Card.Title color={"whiteAlpha.800"} marginBottom={8} textAlign={"center"}>Registration</Card.Title>
                    <Stack gap={7} w={500}>
                        <Field.Root invalid>
                            <Field.Label color={"whiteAlpha.800"}>Email</Field.Label>
                            <Input placeholder="Email" type="email" borderColor={"gray.700"}
                            id="email"
                            
                            color={'whiteAlpha.800'}
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            required
                            />
                            <FieldErrorText>{emailErrorMessage}</FieldErrorText>
                        </Field.Root>
                        <Field.Root invalid>
                            <Field.Label color={"whiteAlpha.800"}>Username</Field.Label>
                            <Input placeholder="Username" color={"whiteAlpha.800"} borderColor={"gray.700"}
                            id="username"
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            required
                            />
                            <FieldErrorText>{usernameErrorMessage}</FieldErrorText>
                        </Field.Root>
                        <Field.Root invalid>
                            <Field.Label color={"whiteAlpha.800"}>Password</Field.Label>
                            <Input placeholder="Password" type="password" color={"whiteAlpha.800"} borderColor={"gray.700"}
                            id="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            />
                            <FieldErrorText>{passwordErrorMessage}</FieldErrorText>
                        </Field.Root>
                    </Stack>
                </Card.Body>
                <Card.Footer justifyContent={"flex-end"}>
                    <Checkbox.Root>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label color={"whiteAlpha.800"}>Accept terms and conditions</Checkbox.Label>
                    </Checkbox.Root>


                    <Button type="submit" variant={"solid"} color={"whiteAlpha.800"} onClick={handleSubmit}>Registration</Button>
                </Card.Footer>
            </Card.Root>
            </Box>
    )
}