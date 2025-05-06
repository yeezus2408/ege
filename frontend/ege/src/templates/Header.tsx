import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Stack,
    Center,
    Button,
    Color,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/cookiesHelper';
import { toast } from 'react-toastify';
  
  interface HeaderProps {
    links: { label: string; href: string }[];
  }
  
  export const Header = ({ links }: HeaderProps) => {
    const isAuth = useAuth()
    const dispath = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = () => {
      dispath(logout())
      removeTokenFromLocalStorage('token')
      toast.success('You logged out')
      navigate('/login')
    }

    const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
      <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
        }}
        href={href}
      >
        {children}
      </Link>
    );
  
    return (
      <Box bg={'gray.900'} px={5} w="100%" position={"absolute"} top={0} justifyItems={'center'} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}  >
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
          />
          <HStack wordSpacing={10} alignItems={'center'}>
            <Box fontWeight="bold" position={'absolute'} left={0} marginLeft={20}>Logo</Box>
            <HStack as={'nav'} wordSpacing={1} display={{ base: 'none', md: 'flex'}} >
              {links.map((link) => (
                <NavLink  key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          {/* Здесь можно добавить компоненты авторизации, кнопки смены темы и т.д. */}
          {!isAuth && (
            <Box right={150} position={'absolute'}>
              <Link href='/user/SignUp'>
                <Button bgColor={'#292929'} w={100}>
                  Sign Up
                </Button>
              </Link>
              <Link href='/user/SignIn'>
                <Button onClick={logoutHandler} marginLeft={5} bgColor={'#292929'} w={100}>
                  Sign In
                </Button>
              </Link>
            </Box>
          )}
          {isAuth && (
            <Box right={150} position={'absolute'} >
              <Link href='/user/profile'>
                <Button bgColor={'#292929'} w={100}>
                  Profile
                </Button>
              </Link>
              <Link>
                <Button onClick={logoutHandler} marginLeft={5} bgColor={'#292929'} w={100}>
                  Logout
                </Button>
              </Link>
            </Box>
          )}
        </Flex>
      </Box>
    );
  };
  