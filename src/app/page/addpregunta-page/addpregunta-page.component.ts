import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Opciones } from 'src/app/model/Opciones';
import { Pregunta, PreguntaTipo } from 'src/app/model/Pregunta';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';
import { Estadistica } from 'src/app/model/Estadistica';

@Component({
  selector: 'app-addpregunta-page',
  templateUrl: './addpregunta-page.component.html'
})
export class AddpreguntaPageComponent {

  test: TestModelo = this.encontrarTest();
  pregunta: Pregunta = this.getPregunta();
  preguntaTipo = PreguntaTipo;
  mostrarTipoPregunta=false;
  msgToast='';

  constructor(private router: Router) { }


  encontrarTest(): TestModelo{
    let url = this.router.url;
    let id = url.split('/')[2];
    return StorageService.getTest(id);
  }

  getPregunta(): Pregunta{
    let pregunta: Pregunta = {
      id: -1,
      opciones: [],
      solucion: [],
      tipo: PreguntaTipo.RADIO,
      titulo: '',
      estadistica: this.getEstadisticaVacia()
    };
    return pregunta;
  }


  anadirOpcion(){
    let opcionVal = $('#opcion').val();
    let safeOpcion = opcionVal==undefined?'':opcionVal.toString();
    let opcion: Opciones = {
      id : this.getSiguienteIdOpcion(),
      opcion: safeOpcion,
    }
    this.pregunta.opciones.push(opcion);
    $('#opcion').val('');
  }

  getSiguienteIdOpcion(): number{
    let max = 0;
    for(let i=0;i<this.pregunta.opciones.length;i++){
      if(this.pregunta.opciones[i].id>max){
        max = this.pregunta.opciones[i].id
      }
    }
    max = max+1;
    return max;
  }

  getSiguienteIdPregunta(): number{
    let max = 0;
    for(let i=0;i<this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id>max){
        max = this.test.preguntas[i].id
      }
    }
    max = max+1;
    return max;
  }


  changeTipoPregunta(tipo:string){
    this.mostrarTipoPregunta=true;
    if(tipo==PreguntaTipo.RADIO){
      this.pregunta.tipo = PreguntaTipo.RADIO
    }else if(tipo==PreguntaTipo.CHECK){
      this.pregunta.tipo = PreguntaTipo.CHECK
    }
  }

  guardarPregunta(){
    if(this.validarFormulario()){
      let titulo = $('#titulopregunta').val();
      let safeTitulo = titulo==undefined?'':titulo.toString();
      let pregunta: Pregunta ={
        id: this.getSiguienteIdPregunta(),
        titulo: safeTitulo,
        tipo: this.getTipoPregunta(),
        opciones: this.pregunta.opciones,
        solucion: this.getSoluciones(this.getTipoPregunta()),
        estadistica: this.getEstadisticaVacia()
      }
      let existe=false;
      for(let i=0;i<this.test.preguntas.length;i++){
        if(this.test.preguntas[i].titulo==pregunta.titulo){
          this.mostrarToast('La pregunta ya existe');
          existe=true;
        }
      }
      if(!existe){
        this.test.preguntas.push(pregunta);
        StorageService.setTest(this.test);
        this.limpiarFormulario();
      }
      console.log(pregunta);
    }
  }

  getEstadisticaVacia(): Estadistica{
    return {
      aciertos: 0,
      fallos: 0,
      ocurrencias: 0
    };
  }

  

  getSoluciones(tipo: PreguntaTipo): number[]{
    let res:number[] =[]
    if(tipo==PreguntaTipo.RADIO){
      let select = $('#selectRadio').val();
      let safeSelect = select==undefined?0:Number(select);
      if(select!='Elige...'){
        res.push(safeSelect);
      }
    }else if(tipo==PreguntaTipo.CHECK){
      let checks=$('.check-opciones');
      for(let i=0;i<checks.length;i++){
        if($(checks[i]).is(':checked')){
          let valor = checks[i].getAttribute('value');
          let safeValue = valor==null?0:Number(valor);
          res.push(safeValue);
        }
      }
    }
    return res;
  }


  getTipoPregunta(): PreguntaTipo {
    let valor=$('input[name="tipopregunta"]:checked').val();
    let res = PreguntaTipo.RADIO;
    if(valor==this.preguntaTipo.CHECK){
      res= PreguntaTipo.CHECK
    }else if(valor==this.preguntaTipo.RADIO){
      res= PreguntaTipo.RADIO
    }
    return res;
  }


  /**
   * True -> valido
   */
  validarFormulario(): boolean{
    let titulo = $('#titulopregunta').val();
    if(titulo==undefined || titulo==''){
      this.mostrarToast('Titulo vacio');
      return false;
    }
    if(!this.mostrarTipoPregunta){
      this.mostrarToast('Seleciona tipo de pregunta');
      return false;
    }
    if(this.pregunta.opciones.length<2){
      this.mostrarToast('Necesitas al menos dos opciones');
      return false;
    }
    let soluciones = this.getSoluciones(this.getTipoPregunta());
    if(soluciones.length==0){
      this.mostrarToast('Seleciona al menos una solucion');
      return false;
    }
    return true;
  }

  mostrarToast(msg: string){
    this.msgToast=msg;
    console.log(this.msgToast)
  }

  limpiarFormulario(){
    $('#titulopregunta').val('');
    $('input[name="tipopregunta"]').prop('checked', false);
    this.mostrarTipoPregunta=false;
    this.pregunta.opciones=[];
  }

}
