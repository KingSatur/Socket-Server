import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socketIO from 'socket.io';
import http from 'http';
import { desconectar } from '../sockets/sockets';
import * as socket from '../sockets/sockets';
export default class Server {
  public app: express.Application;
  public port: number;
  private static _instance: Server;

  // Configuracion de los sockets
  // Encargada de los eventos de los sockets
  public io: SocketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);

    this.io = socketIO(this.httpServer);
    this.escucharSockets();
  }

  // Patron singleton
  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log('Escuchando conexiones - Sockets');

    this.io.on('connection', (cliente) => {
      console.log('Nuevo cliente');

      // Desconectar
      socket.desconectar(cliente);

      // Mensajes
      socket.mensaje(cliente, this.io);
    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
    // this.app.listen(this.port, callback());
  }
}
