import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RespuestaApi } from 'src/app/models/respuestaapi.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PaisService } from 'src/app/services/pais.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-ls',
  templateUrl: './usuario-ls.component.html',
  styleUrls: ['./usuario-ls.component.css']
})
export class UsuarioLsComponent implements OnInit {

  lista: UsuarioModel[] = [];
  listaPaises:any;
  form: FormGroup;
  constructor(private usuarioService:UsuarioService,
    private paisService: PaisService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarListas();
    this.obtenerUsuarios();
  }

  cargarListas() {
    this.paisService.get()
    .subscribe(res=>{
      this.listaPaises = res;
    })
  }
  
  crearFormulario() {
    this.form = new FormGroup({
      IdUsuario: new FormControl(0),
      Nombre: new FormControl('',[Validators.required]),
        Apellido: new FormControl('',[Validators.required]),
        CodigoPais: new FormControl(0,[Validators.required]),
        Telefono: new FormControl('',[Validators.minLength(7),Validators.maxLength(15)]),
        CorreoElectronico: new FormControl('',[Validators.required, Validators.email]),
        DeseaContacto: new FormControl(false,[Validators.required]),
        FechaNacimiento: new FormControl('',[Validators.required]),
    });
  }

  crearFormatoFecha(fecha: string): string {

    const date: Date = new Date(fecha);

    if(date.getFullYear() <= 1900){
      return "";
    }
    const año = date.getFullYear().toString();
    const mes = (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    const dia = date.getDate() <= 9 ? '0' + date.getDate().toString() : date.getDate().toString();
    return año + '-' + mes + '-' + dia;
  }

  obtenerUsuarios() {
    this.usuarioService.get()
    .subscribe((res:RespuestaApi)=>{
      if(res.Codigo == 0){
        this.lista = res.Respuesta;
      }
      else{
        alert(res.Respuesta);
      }
      
    }, err=>{
      console.log(err);
      alert("ha ocurrido un error al obtener los usuarios");
    })
  }

  confirmarEliminar(id:number){
    if(confirm("¿Está seguro de eliminar el registro?")){
      this.usuarioService.delete(id)
      .subscribe((res:RespuestaApi)=>{
        if(res.Codigo == 0){
          alert(res.Respuesta);
          this.obtenerUsuarios();
        }
        else{
          alert(res.Respuesta);
        }
        
      })
    }
  }

  abrirPopupEditar(item?:UsuarioModel){
    if(item)
    {
      this.form.patchValue({
        IdUsuario: item.IdUsuario,
        Nombre: item.Nombre,
        Apellido: item.Apellido,
        Telefono: item.Telefono,
        CodigoPais: item.CodigoPais,
        CorreoElectronico: item.CorreoElectronico,
        DeseaContacto: item.DeseaContacto,
        FechaNacimiento: this.crearFormatoFecha(item.FechaNacimiento.toString())
      })
    }
    else{
      this.form.patchValue({
        IdUsuario: 0,
        Nombre:'',
        Apellido: '',
        Telefono: '',
        CodigoPais: '',
        CorreoElectronico: '',
        DeseaContacto: false,
        FechaNacimiento: ''
      })
    }
  }

  guardar(){
    if(this.form.valid){

      if(this.form.value.IdUsuario == 0){
        this.usuarioService.add(this.form.value)
        .subscribe((res:RespuestaApi)=>{
          console.log(res);
          if(res.Codigo == 0){
            document.getElementById("btnCerrarModal").click();
            alert(res.Respuesta);
            this.form.markAsUntouched()
            this.obtenerUsuarios();
          }
          else{
            alert(res.Respuesta);
          }
        }, err=>{
          console.log(err);
          alert("ha ocurrido un error al guardar un usuario")
          
        })
      }
      else{
        this.usuarioService.update(this.form.value)
      .subscribe((res:RespuestaApi)=>{
        console.log(res);
        if(res.Codigo == 0){
          document.getElementById("btnCerrarModal").click();
          alert(res.Respuesta);
          this.obtenerUsuarios();
        }
        else{
          alert(res.Respuesta);
        }
      }, err=>{
        console.log(err);
        alert("ha ocurrido un error al actualizar un usuario")
        
      })
      }

      
    }
  }
}
