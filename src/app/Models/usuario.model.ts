export class LoginModel {
  email: string;
  password: string;
}

export class UsuarioModel extends LoginModel  {
  nombre: string;
}
