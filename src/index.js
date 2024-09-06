import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Util/Layout';
import Home from './view/Home/Home';
import About from './view/About/About';
import Contact from './view/Contact/Contact';
import "./main.css"


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { path: '/', element: <Home/> },
      { path: '/about', element: <About/> },
      { path: '/contact', element: <Contact/> },
      { path: '*', element: <h1>404 Not Found</h1> },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
