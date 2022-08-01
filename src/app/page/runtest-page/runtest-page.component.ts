import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';
import { Resultado } from 'src/app/model/Resultado';
import { Opciones } from 'src/app/model/Opciones';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-runtest-page',
  templateUrl: './runtest-page.component.html',
  styleUrls: ['./runtest-page.component.css']
})
export class RuntestPageComponent implements OnInit {


  test: TestModelo= this.encontrarTest();
  mostrarResultado= false;
  resultados: Resultado[]=[];

  textoAciertos='';
  textoAciertosSafe: SafeHtml='';
  textoFallos='';
  textoFallosSafe: SafeHtml='';
  textoEstadisticas='';
  textoEstadisticasSafe: SafeHtml='';

  constructor(private router: Router, private domSanitizer: DomSanitizer) { }

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
    this.setTextos();
    this.mostrarResultado=true;
  }


  setTextos() {
    let aciertos = this.getAciertos();
    for(let i=0;i!=aciertos.length;i++){
      this.textoAciertos= this.textoAciertos + this.procesarResultado(aciertos[i]);
    }
    this.textoAciertosSafe = this.domSanitizer.bypassSecurityTrustHtml(this.textoAciertos);

    let fallos = this.getFallos();
    for(let i=0;i!=fallos.length;i++){
      this.textoFallos= this.textoFallos + this.procesarResultado(fallos[i]);
    }
    this.textoFallosSafe = this.domSanitizer.bypassSecurityTrustHtml(this.textoFallos);
    this.setTextoEstadisticas();
  }

  setTextoEstadisticas(){
    let porcentaje = (this.getAciertos().length*100)/this.test.preguntas.length;
    let res = `<div>El test tiene ${this.test.preguntas.length} preguntas <br>`;
    res = res + `Has acertado ${this.getAciertos().length} <br>`
    res = res + `Has fallado ${this.getFallos().length} <br>`
    res = res + `Porcentaje: ${porcentaje.toFixed(2)}%</div>`
    this.textoEstadisticasSafe = this.domSanitizer.bypassSecurityTrustHtml(res);
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
    let res=`<p>${resultado.id} - ${this.getTituloPregunta(resultado.id)}</p>`;
    let opciones = this.getOpcionesPregunta(resultado.id);
    let solucion = this.getSolucionPregunta(resultado.id);
    for(let i=0;i!=opciones.length;i++){
      let checked = resultado.solucion.includes(opciones[i].id);
      let esCorrecto = solucion.includes(opciones[i].id)
      res = res +`<input class="form-check-input" type="checkbox" disabled ${checked?'checked':''}>
      <label class="form-check-label">
          ${opciones[i].opcion} ${checked && esCorrecto?'✔️':''} ${!checked && esCorrecto?'✔️':'' } ${checked && !esCorrecto?'❌':''}
      </label> <br>`;
    }
    
    return res;
  }

  getAciertos(): Resultado[]{
    let filtrado: Resultado[]=[];
    for(let i=0;i!=this.resultados.length;i++){
      if(this.resultados[i].correcto){
        filtrado.push(this.resultados[i])
      }
    }
    return filtrado;
  }

  getFallos(): Resultado[]{
    let filtrado: Resultado[]=[];
    for(let i=0;i!=this.resultados.length;i++){
      if(!this.resultados[i].correcto){
        filtrado.push(this.resultados[i])
      }
    }
    return filtrado;
  }

  getTituloPregunta(id: number):string{
    let res='';
    for(let i=0;i!=this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id==id){
        res=this.test.preguntas[i].titulo;
      }
    }
    return res;
  }

  getOpcionesPregunta(id: number): Opciones[]{
    let res: Opciones[]=[];
    for(let i=0;i!=this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id==id){
        res=this.test.preguntas[i].opciones;
      }
    }
    return res;
  }

  getSolucionPregunta(id: number): number[]{
    let res: number[]=[];
    for(let i=0;i!=this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id==id){
        res=this.test.preguntas[i].solucion;
      }
    }
    return res;
  }

}
