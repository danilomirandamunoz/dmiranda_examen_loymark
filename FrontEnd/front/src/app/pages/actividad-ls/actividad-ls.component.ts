import { Component, OnInit } from '@angular/core';
import { ActividadModel } from 'src/app/models/actividad.model';
import { RespuestaApi } from 'src/app/models/respuestaapi.model';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-actividad-ls',
  templateUrl: './actividad-ls.component.html',
  styleUrls: ['./actividad-ls.component.css']
})
export class ActividadLsComponent implements OnInit {

  lista: ActividadModel[] = [];

  constructor(private service:ActividadService) { }

  ngOnInit(): void {
    this.obtenerActividades();
  }

  


  obtenerActividades() {
    this.service.get()
    .subscribe((res:RespuestaApi)=>{
      if(res.Codigo == 0){
        this.lista = res.Respuesta;
      }
      else{
        alert(res.Respuesta);
      }
      
    }, err=>{
      console.log(err);
      alert("ha ocurrido un error al obtener las actividades");
    })
  }
}
