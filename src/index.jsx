import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ChangePassword from './components/ChangePassword';
import { Provider } from 'react-redux';
import store from './store/Store'
import UpdateUser from './components/UpdateUser';
import UpdateAvatar from './components/UpdateAvatar';
import PageNotFound from './Pages/PageNotFound';

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
        path: '/user/:username',
        element: <Home/>
      },
      {
        path: '/user/:username/changePassword',
        element: <ChangePassword/>
      },
      {
        path: '/user/:username/updateUser',
        element: <UpdateUser/>
      },
      {
        path: '/user/:username/avatar',
        element: <UpdateAvatar/>
      },
      {
        path: '*',
        element: <PageNotFound/>
      },
      

    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
