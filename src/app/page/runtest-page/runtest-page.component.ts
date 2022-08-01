import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';
import { Resultado } from 'src/app/model/Resultado';

@Component({
  selector: 'app-runtest-page',
  templateUrl: './runtest-page.component.html',
  styleUrls: ['./runtest-page.component.css']
})
export class RuntestPageComponent implements OnInit {


  test: TestModelo= this.encontrarTest();
  mostrarResultado= false;
  resultados: Resultado[]=[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  encontrarTest(): TestModelo{
    let url = this.router.url;
    let id = url.split('/')[2];
    return StorageService.getTest(id);
  }


  finalizarTest(){
    let res = this.obtenerResultadosTest();
    this.resultados = this.comprobarResultados(res);
    this.mostrarResultado=true;
  }

  obtenerResultadosTest(): Resultado[]{
    let resultados: Resultado[]=[];
    let resultado:Resultado;
    for(let i=0;i!=this.test.preguntas.length;i++){
      resultado={
        id: this.test.preguntas[i].id,
        solucion:[],
        correcto: false,
      }
      for(let j=0;j!= this.test.preguntas[i].opciones.length;j++){
        let a = this.test.preguntas[i].id;
        let b =this.test.preguntas[i].opciones[j].id;
        let elemento = $(`#${a}-${b}`);
        if(elemento.is(':checked')){
          let res = elemento.val();
          let safeRes= res==undefined?-1:Number(res);
          resultado.solucion.push(safeRes);
        }
      }
      resultados.push(resultado);
    }
    console.log(resultados);
    return resultados;
  }

  comprobarResultados(resultados: Resultado[]): Resultado[]{
    let res: Resultado[]=[];
    for(let i=0;i!=this.test.preguntas.length;i++){
      for(let j=0;j!=resultados.length;j++){
        if(this.test.preguntas[i].id==resultados[j].id){
          let arSolucion = this.test.preguntas[i].solucion;
          let arResultado = resultados[j].solucion;
          let mal =false;
          for(let k=0;k!=arSolucion.length;k++){
            if(!arResultado.includes(arSolucion[k])){
              mal = true;
            }
          }
          if(mal || arResultado.length!=arSolucion.length){
            console.log(`La pregunta ${this.test.preguntas[i].id} esta mal`);
            resultados[j].correcto=false;
          }else if(!mal && arResultado.length==arSolucion.length){
            console.log(`La pregunta ${this.test.preguntas[i].id} esta bien`);
            resultados[j].correcto=true;
          }
          res.push(resultados[j]);
        }
      }
    }
    return res;
  }

  procesarResultado(resultado: Resultado): string{
    let res='';
    if(resultado.correcto){
      res = `<p class="text-success">La pregunta ${resultado.id} es correcta</p>`
    }else{
      res = `<p class="text-danger">La pregunta ${resultado.id} es incorrecta</p>`
    }
    return res;
  }

}
