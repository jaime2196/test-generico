import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';
import { Resultado } from 'src/app/model/Resultado';
import { Opciones } from 'src/app/model/Opciones';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfiguracionTest, TestTipo } from 'src/app/model/ConfiguracionTest';
import { formatNumber, ViewportScroller } from '@angular/common';
import { Pregunta } from 'src/app/model/Pregunta';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-runtest-page',
  templateUrl: './runtest-page.component.html',
  styleUrls: ['./runtest-page.component.css'], 
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({  opacity: 0 }),
            animate(500, 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  opacity: 1 }),
            animate(500, 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RuntestPageComponent implements OnInit, OnDestroy {


  test: TestModelo= this.encontrarTest();
  preguntas: Pregunta[]= [];
  mostrarResultado= false;
  resultados: Resultado[]=[];

  textoAciertos='';
  textoAciertosSafe: SafeHtml='';
  textoFallos='';
  textoFallosSafe: SafeHtml='';
  textoEstadisticas='';
  textoEstadisticasSafe: SafeHtml='';

  textoConfig1 = 'Cargando...';
  textoConfig2 = 'Cargando...';

  mostrarAciertos=false;
  mostrarFallos=false;

  segundos = 0;
  minutos = 0;
  interval = setInterval(()=>{
      this.segundos++;
      if(this.segundos==59){
        this.segundos=0;
        this.minutos++;
      }
      $('#tiempo-test').text(`Tiempo transcurrido: ${this.getTiempoFormteado()}`);
    },1000);


  pageYoffset=0;
  @HostListener('window:scroll', ['$event']) onScroll(event:any){
    this.pageYoffset = window.scrollY;
    
  }


  constructor(private router: Router, private domSanitizer: DomSanitizer, private scroll: ViewportScroller) { }

  ngOnDestroy(): void {
    this.pararTiempo();
  }


  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
}

  pararTiempo(){
    clearInterval(this.interval);
    $('#pie-pagina').show();
    $('#tiempo-test').text('')
  }

  getTiempoFormteado(): string{
    return `${formatNumber(this.minutos, 'en-EN', '2.0')}:${formatNumber(this.segundos, 'en-EN', '2.0')}`;
  }

  ngOnInit(): void {
    console.log(history.state.data);
    let configTest: ConfiguracionTest = history.state.data ?? {numeroPreguntas:this.test.preguntas.length,tipoTest: TestTipo.normal}
    this.initConfigTest(configTest);

    $(()=>{
      $('#pie-pagina').hide();
    });
  }

  initConfigTest(configTest: ConfiguracionTest){
    this.textoConfig1 = configTest.tipoTest.toLowerCase();
    this.textoConfig2 = configTest.numeroPreguntas.toString();
    if(configTest.tipoTest==TestTipo.normal){
      this.preguntas = this.filtrarPreguntasNumero(configTest.numeroPreguntas, this.filtrarPreguntasNormal(this.test.preguntas ));
    }else if(configTest.tipoTest==TestTipo.aleatorio){
      this.preguntas = this.filtrarPreguntasNumero(configTest.numeroPreguntas, this.filtrarPreguntasAleatorio(this.test.preguntas));
    }else if(configTest.tipoTest==TestTipo.menos_falladas){
      this.preguntas = this.filtrarPreguntasNumero(configTest.numeroPreguntas, this.fitrarPreguntasMenosfalladas(this.test.preguntas));
    }else if(configTest.tipoTest==TestTipo.mas_falladas){
      this.preguntas = this.filtrarPreguntasNumero(configTest.numeroPreguntas, this.fitrarPreguntasMasfalladas(this.test.preguntas));
    }else if(configTest.tipoTest==TestTipo.mas_ocurrencias){
      this.preguntas = this.filtrarPreguntasNumero(configTest.numeroPreguntas, this.fitrarPreguntasMasOcurrencias(this.test.preguntas));
    }else if(configTest.tipoTest==TestTipo.menos_ocurrencias){
      this.preguntas = this.filtrarPreguntasNumero(configTest.numeroPreguntas, this.fitrarPreguntasMenossOcurrencias(this.test.preguntas));
    }
  }

 
  filtrarPreguntasNumero(numero: number, preguntas: Pregunta[]): Pregunta[]{
    return preguntas.slice(0, numero);;
  }

  filtrarPreguntasAleatorio(preguntas: Pregunta[]): Pregunta[]{
    let m = preguntas.length, t, i;
    while (m) {    
      i = Math.floor(Math.random() * m--);
      t = preguntas[m];
      preguntas[m] = preguntas[i];
      preguntas[i] = t;
    }
    return preguntas;
  }

  filtrarPreguntasNormal(preguntas: Pregunta[]): Pregunta[]{
    return preguntas.sort((a,b)=>{
      if(a.id>b.id){
        return 1;
      }else if(a.id<b.id){
        return -1
      }else{
        return 0;
      }
    });
  }

  fitrarPreguntasMenosfalladas(preguntas: Pregunta[]): Pregunta[]{
    return preguntas.sort((a,b)=>{
      if(a.estadistica.fallos>b.estadistica.fallos){
        return 1;
      }else if(a.estadistica.fallos<b.estadistica.fallos){
        return -1
      }else{
        return 0;
      }
    });
  }

  fitrarPreguntasMasfalladas(preguntas: Pregunta[]): Pregunta[]{
    return preguntas.sort((a,b)=>{
      if(a.estadistica.fallos>b.estadistica.fallos){
        return -1;
      }else if(a.estadistica.fallos<b.estadistica.fallos){
        return 1
      }else{
        return 0;
      }
    });
  }

  fitrarPreguntasMasOcurrencias(preguntas: Pregunta[]): Pregunta[]{
    return preguntas.sort((a,b)=>{
      if(a.estadistica.ocurrencias>b.estadistica.ocurrencias){
        return -1;
      }else if(a.estadistica.ocurrencias<b.estadistica.ocurrencias){
        return 1
      }else{
        return 0;
      }
    });
  }

  fitrarPreguntasMenossOcurrencias(preguntas: Pregunta[]): Pregunta[]{
    return preguntas.sort((a,b)=>{
      if(a.estadistica.ocurrencias>b.estadistica.ocurrencias){
        return 1;
      }else if(a.estadistica.ocurrencias<b.estadistica.ocurrencias){
        return -1
      }else{
        return 0;
      }
    });
  }


  encontrarTest(): TestModelo{
    let url = this.router.url;
    let id = url.split('/')[2];
    return StorageService.getTest(id);
  }


  finalizarTest(){
    let res = this.obtenerResultadosTest();
    this.resultados = this.comprobarResultados(res);
    this.setResultadosEstadisticas(this.resultados);
    this.setTextos();
    this.mostrarResultado=true;
    this.pararTiempo();
  }


  setTextos() {
    let aciertos = this.getAciertos();
    for(let i=0;i<aciertos.length;i++){
      this.textoAciertos= this.textoAciertos + this.procesarResultado(aciertos[i]);
    }
    this.textoAciertosSafe = this.domSanitizer.bypassSecurityTrustHtml(this.textoAciertos);

    let fallos = this.getFallos();
    for(let i=0;i<fallos.length;i++){
      this.textoFallos= this.textoFallos + this.procesarResultado(fallos[i]);
    }
    this.textoFallosSafe = this.domSanitizer.bypassSecurityTrustHtml(this.textoFallos);
    this.setTextoEstadisticas();
  }

  setTextoEstadisticas(){
    let porcentaje = (this.getAciertos().length*100)/this.test.preguntas.length;
    let res = `<div>El test tiene ${this.preguntas.length} preguntas:<br>`;
    res = res + '<ul  class="list-group">'
    res = res + `<li class="list-group-item">Has acertado ${this.getAciertos().length}</li>`
    res = res + `<li class="list-group-item">Has fallado ${this.getFallos().length}</li>`
    res = res + `<li class="list-group-item">Porcentaje de aciertos: ${porcentaje.toFixed(2)}%</li>`
    res = res + `<li class="list-group-item"> Has tardado  ${this.getTiempoFormteado()}</li>`;
    res = res + '</ul>'
    res = res + '</div>'
    this.textoEstadisticasSafe = this.domSanitizer.bypassSecurityTrustHtml(res);
  }

  obtenerResultadosTest(): Resultado[]{
    let resultados: Resultado[]=[];
    let resultado:Resultado;
    for(let i=0;i<this.preguntas.length;i++){
      resultado={
        id: this.test.preguntas[i].id,
        solucion:[],
        correcto: false,
      }
      for(let j=0;j< this.preguntas[i].opciones.length;j++){
        let a = this.preguntas[i].id;
        let b =this.preguntas[i].opciones[j].id;
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
    for(let i=0;i<this.preguntas.length;i++){
      for(let j=0;j<resultados.length;j++){
        if(this.preguntas[i].id==resultados[j].id){
          let arSolucion = this.preguntas[i].solucion;
          let arResultado = resultados[j].solucion;
          let mal =false;
          for(let k=0;k<arSolucion.length;k++){
            if(!arResultado.includes(arSolucion[k])){
              mal = true;
            }
          }
          if(mal || arResultado.length!=arSolucion.length){
            console.log(`La pregunta ${this.preguntas[i].id} esta mal`);
            resultados[j].correcto=false;
          }else if(!mal && arResultado.length==arSolucion.length){
            console.log(`La pregunta ${this.preguntas[i].id} esta bien`);
            resultados[j].correcto=true;
          }
          res.push(resultados[j]);
        }
      }
    }
    return res;
  }

  procesarResultado(resultado: Resultado): string{
    let res =`<div class="card m-4" >
    <div class="card-body">
    <h5 class="card-title">${resultado.id} - ${this.getTituloPregunta(resultado.id)}</h5>`;
    let opciones = this.getOpcionesPregunta(resultado.id);
    let solucion = this.getSolucionPregunta(resultado.id);
    for(let i=0;i<opciones.length;i++){
      let checked = resultado.solucion.includes(opciones[i].id);
      let esCorrecto = solucion.includes(opciones[i].id)
      res = res +`<div class="form-check"><input class="form-check-input" type="checkbox" disabled ${checked?'checked':''}>
      <label class="form-check-label">
          ${opciones[i].opcion} ${checked && esCorrecto?'✔️':''} ${!checked && esCorrecto?'✔️':'' } ${checked && !esCorrecto?'❌':''}
      </label></div>`;
    }
    res = res + '</div></div>';
    return res;
  }

  getAciertos(): Resultado[]{
    let filtrado: Resultado[]=[];
    for(let i=0;i<this.resultados.length;i++){
      if(this.resultados[i].correcto){
        filtrado.push(this.resultados[i])
      }
    }
    return filtrado;
  }

  getFallos(): Resultado[]{
    let filtrado: Resultado[]=[];
    for(let i=0;i<this.resultados.length;i++){
      if(!this.resultados[i].correcto){
        filtrado.push(this.resultados[i])
      }
    }
    return filtrado;
  }

  getTituloPregunta(id: number):string{
    let res='';
    for(let i=0;i<this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id==id){
        res=this.test.preguntas[i].titulo;
      }
    }
    return res;
  }

  getOpcionesPregunta(id: number): Opciones[]{
    let res: Opciones[]=[];
    for(let i=0;i<this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id==id){
        res=this.test.preguntas[i].opciones;
      }
    }
    return res;
  }

  getSolucionPregunta(id: number): number[]{
    let res: number[]=[];
    for(let i=0;i<this.test.preguntas.length;i++){
      if(this.test.preguntas[i].id==id){
        res=this.test.preguntas[i].solucion;
      }
    }
    return res;
  }

  setResultadosEstadisticas(resultados: Resultado[]){
    for(let i=0;i<resultados.length;i++){
      for(let j=0;j<this.test.preguntas.length;j++){
        if(resultados[i].id==this.test.preguntas[j].id){
          this.test.preguntas[j].estadistica.ocurrencias++;
          if(resultados[i].correcto){
            this.test.preguntas[j].estadistica.aciertos++;
          }else{
            this.test.preguntas[j].estadistica.fallos++;
          }
        }
      }
    }
    StorageService.setTest(this.test);
  }


  togleResultado(resultado: string){
    if(resultado=='aciertos'){
      this.mostrarAciertos=!this.mostrarAciertos;
    }else if(resultado=='fallos'){
      this.mostrarFallos=!this.mostrarFallos;
    }
  }

}
