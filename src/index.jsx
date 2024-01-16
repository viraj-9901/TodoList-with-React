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
import UserInfo from './components/UserInfo';
import { useSelector } from 'react-redux';
import VerifyAccount from './components/VerifyAccount';

//this is authStatus check for stop navigate app to main page when refresh from any page
// const ConditionalRoute = ({ condition, trueElement, falseElement }) => {
//   return condition ? trueElement : falseElement;
// };
let {status} = store.getState()
console.log(status);


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        // element: status? <Home/> : <App />
        element: status? <App/> : <Home />
      },
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
        path: '/user/:username/userInfo',
        element: <UserInfo/>
      },
      {
        path: '/user/:username/verify/:token',
        element: <VerifyAccount />
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
      {/* <RouterProvider router={router} /> */}
      <RouterProvider router={router} >
        <Home />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

