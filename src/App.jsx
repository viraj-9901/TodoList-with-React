// import Login from './Pages/Login.page';
import Background from './components/Background'
import ForGround from './components/ForGround';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
      <Background />
      <ForGround />
      {/* <Outlet /> */}
      
    </div>
  )
}

export default App;
