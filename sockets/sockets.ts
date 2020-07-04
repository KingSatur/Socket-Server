import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/user-list';
import { Usuario } from '../classes/user';

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
  const usuario = new Usuario(cliente.id);
  listaUsuarios.add(usuario);
};

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('disconnect', () => {
    listaUsuarios.borrarUsuario(cliente.id);
    cliente.emit('usuarios-activos');
    console.log('Cliente desconectado');
    io.emit('usuarios-activos', listaUsuarios.getList());
  });
};

export const listaUsuarios = new UsuariosLista();

export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('mensaje', (payload: { de: string; cuerpo: string }) => {
    console.log('Mensaje recibido', payload);

    io.emit('mensaje-nuevo', payload);
  });
};

export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on('obtener-usuarios', () => {
    // console.log('Logeando usuario', payload.nombre);
    io.emit('usuarios-activos', listaUsuarios.getList());
  });
};

export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on(
    'configurar-usuario',
    (payload: { nombre: String }, callback: Function) => {
      // console.log('Logeando usuario', payload.nombre);
      listaUsuarios.actualizarNombre(cliente.id, payload.nombre);
      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre}, logeado`,
      });
      io.emit('usuarios-activos', listaUsuarios.getList());
    }
  );
};
