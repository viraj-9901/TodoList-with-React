import Background from './components/Background'
import ForGround from './components/ForGround';
import socket from './socket/socket';

function App() {
   
    socket.on("message", (data) => {
      console.log(data);
    })
    
    socket.on('greetings', (data) => {
      console.log(data);
    })
    socket.emit('message','Hello from React!');

  
  
  return (
    <div className='relative w-full h-screen bg-zinc-800'>
      <Background />
      <ForGround />
    </div>
  )
}

export default App;
