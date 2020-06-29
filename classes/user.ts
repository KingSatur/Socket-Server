export class Usuario {
  public id: String;
  public nombre: String;
  public sala: String;

  constructor(id: String) {
    this.id = id;
    this.nombre = 'Anonimo';
    this.sala = 'sin-sala';
  }
}
