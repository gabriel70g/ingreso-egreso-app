export class Usuario {
  static fromFirebase(email: string, nombre: string, uid: string) {
    return new Usuario(uid, nombre, email);
  }
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}
}
