import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider  value={defaultSystem} >
      <App />
      <ToastContainer position='bottom-left' autoClose={2000}/>
    </ChakraProvider>
  </Provider>
)
