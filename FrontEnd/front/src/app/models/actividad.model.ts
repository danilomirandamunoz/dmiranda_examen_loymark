import { UsuarioModel } from "./usuario.model";

export class ActividadModel{
    IdActividad:number;
    FechaCreacion:Date;
    IdUsuario:number;
    Detalle:string;
    Usuario:UsuarioModel;
}