import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/model/Pregunta';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';

@Component({
  selector: 'app-ver-respuestas-page',
  templateUrl: './ver-respuestas-page.component.html',
  styleUrls: ['./ver-respuestas-page.component.css']
})
export class VerRespuestasPageComponent implements OnInit {


  preguntas: Pregunta[] = []; 
  preguntasMostrar: Pregunta[] = [];

  constructor(private router : Router) { }

  ngOnInit(): void {
    let idTests: string[] = history.state.data!=null?history.state.data:[];
    if(idTests.length==0){
      this.router.navigate(['/']);
    }else{
      this.initTests(idTests);
    }
  }


  initTests(idTests: string[]){
    for(let i=0;i!=idTests.length;i++){
     this.preguntas = this.preguntas.concat(StorageService.getTest(idTests[i]).preguntas);
    }
    this.preguntasMostrar = this.preguntas;
  }

  registrarEvento(){
    let valor = $('#buscador').val();
    let safeValor = valor==undefined?'':valor.toString();
    this.buscar(safeValor);
  }

  buscar(texto: string){
    texto = texto.toLowerCase();
    if(texto==''){
      this.preguntasMostrar = this.preguntas;
    }else{
      this.preguntasMostrar=[];
      for(let j=0;this.preguntas.length != j;j++){
        if(this.preguntas[j].titulo.toLowerCase().includes(texto)){
          this.preguntasMostrar.push(this.preguntas[j]);
        }else{
          for(let i =0;i!=this.preguntas[j].opciones.length;i++){
            let opcion = this.preguntas[j].opciones[i].opcion.toLowerCase();
            if(opcion.includes(texto)){
              this.preguntasMostrar.push(this.preguntas[j]);
            }
          }
        }
      }
    }
    
    
  }

}
