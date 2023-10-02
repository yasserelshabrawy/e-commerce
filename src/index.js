import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { UserContextProvider } from './components/Context/Context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CartContextProvider } from './components/CartContext/CartContext';



let queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <QueryClientProvider client={queryClient}>
    <CartContextProvider>
     <UserContextProvider>
  <App />
  </UserContextProvider>
  </CartContextProvider>
  </QueryClientProvider>
  



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
