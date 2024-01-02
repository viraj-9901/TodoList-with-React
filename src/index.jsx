import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ForGround from './components/ForGround';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import TaskForm from './components/TaskForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/user/register',
        element: <Register/>
      },
      {
        path: '/user/login',
        element: <Login/>
      },
      {
        path: '/user/:username/home',
        element: <Home/>
      },
      // {
      //   path: '/user/:username/addTask',
      //   element: <TaskForm/>
      // }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
