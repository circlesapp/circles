import io, { Socket } from 'socket.io-client';

class SocketIO {
  public socket?: Socket;

  constructor() {}

  init() {
    this.socket = io('https://circles.hyunwoo.dev/');
    return this.socket;
  }
}

export default new SocketIO();
