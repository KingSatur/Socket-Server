import { Usuario } from './user';

export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  public add(user: Usuario) {
    this.lista.push(user);
    console.log(this.lista);
    return user;
  }

  public actualizarNombre(id: string, nombre: String) {
    this.lista.forEach((user) => {
      if (user.id == id) {
        user.nombre = nombre;
      }
    });
    console.log(this.lista);
  }

  //   Obtener lista de usuario
  public getList() {
    return this.lista;
  }

  public getUser(id: string) {
    return this.lista.find((user) => user.id == id);
  }

  public getUserSale(sala: string) {
    return this.lista.filter((user) => user.sala == sala);
  }

  public borrarUsuario(id: string) {
    const user = this.getUser(id);
    this.lista = this.lista.filter((user) => user.id != id);
    console.log(this.lista);
    return this.lista;
  }
}
