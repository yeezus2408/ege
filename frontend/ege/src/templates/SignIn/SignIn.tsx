import { Box, Button, Card, Checkbox, Field, FieldErrorText, Input, Stack } from "@chakra-ui/react";
import React, { JSX, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { setCookie } from 'typescript-cookie'
import { toast } from "react-toastify";
import { AuthService } from "../../services/auth.service";
import { setTokenToLocalStorage } from "../../helpers/cookiesHelper";
import { login } from "../../store/user/userSlice";

export default function SignIn(): JSX.Element{
    const [emailErrorMessage] = React.useState('');
    const [passwordErrorMessage] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispath = useDispatch();

    const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
        const response = await AuthService.auth({email , password});
        if(response){
            setTokenToLocalStorage('token', response.token)
            setCookie('slivki', response.token)
            dispath(login(response))
            toast.success("Successful")
        }
    } catch (error) {
        console.error('Login failed:', error);
        toast.error("Неверный пароль или E-Mal.")
    }
        // console.log(role);
        
  
    };






    return (
            <Box maxW={'full'} display={'flex'} justifyContent={'center'} marginTop={'250px'}>
                <Card.Root w={600} bgColor={"gray.800"} borderColor={"gray.700"}>
                <Card.Body>
                    <Card.Title color={"whiteAlpha.800"} marginBottom={8} textAlign={"center"}>Login</Card.Title>
                    <Stack gap={7} >
                        <Field.Root>
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
                        <Field.Root>
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
                        <Checkbox.Label color={"whiteAlpha.800"}>Remember me</Checkbox.Label>
                    </Checkbox.Root>


                    <Button type="submit" variant={"solid"} color={"whiteAlpha.800"} onClick={handleSubmit}>Login</Button>
                </Card.Footer>
            </Card.Root>
            </Box>
    )
}