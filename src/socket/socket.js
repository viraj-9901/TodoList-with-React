import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_URI_DOMAIN_PORT);

export default socket