import { Component, Input, OnInit } from '@angular/core';
import { Pregunta, PreguntaTipo } from '../../model/Pregunta';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  tipoPregunta = PreguntaTipo;
  @Input() pregunta: Pregunta ={
    id: 0,
    tipo: PreguntaTipo.CHECK,
    titulo: 'Título asdas da sdasd asdasd asdf sdfgdfgdfg df gd gdzfgzd fgzdf gdfg zdf g(Solo una opcion correcta)',
    opciones: [{
      id: 0,
      opcion: 'Cero'
    },
    {
      id: 1,
      opcion: 'Uno'
    }],
    solucion: [0],
    estadistica: {
      ocurrencias: 0,
      aciertos: 0,
      fallos: 0
    }
  };
  @Input() mostrarRespCorrecta = false;
  subtitulo: string ='';
  constructor() { }

  ngOnInit(): void {
    this.setSubtitulo();
    this.mostrarRespuestaCorrecta();
  }

  setSubtitulo(){
    let titulo = this.pregunta.titulo;
    if(titulo.includes('(')){
      let inicio = titulo.lastIndexOf('(');
      this.subtitulo =titulo.substring(inicio);
      this.pregunta.titulo = this.pregunta.titulo.substring(0,inicio);
    }
  }

  mostrarRespuestaCorrecta(){
    if(this.mostrarRespCorrecta){
      for(let i=0;i!=this.pregunta.opciones.length;i++){
        if(this.pregunta.solucion.includes(this.pregunta.opciones[i].id)){
          this.pregunta.opciones[i].opcion = '✔️✔️ '+this.pregunta.opciones[i].opcion+' ✔️✔️';
        }
      }
    }
  }
}
