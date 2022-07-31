import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TestModelo } from 'src/app/model/TestModelo';

@Component({
  selector: 'app-addtest-page',
  templateUrl: './addtest-page.component.html',
  styleUrls: ['./addtest-page.component.css']
})
export class AddtestPageComponent implements OnInit {

  tests: TestModelo[]=[] ;

  constructor(){ 
  }

  ngOnInit(): void {
    this.initTests();
  }

  initTests(){
    let testsStr = localStorage.getItem('TESTS');
    if(testsStr!=null){
      this.tests=JSON.parse(testsStr);
    }
  }


  anadirPreguntas(){
    this.guardar();
    // TODO: mover a la pagina de añadir preguntas
  }


  guardar(){
    let titulo = $('#titulo').val();
    let safeTitulo = titulo==undefined?'':titulo.toString();
    let sub = $('#subtitulo').val();
    let safeSub =  sub==undefined?'':sub.toString();
    let id =0;
    if(this.tests.length!=0){
      id = this.getSiguienteId();
      let nuevoTest = this.getTestModelo(safeTitulo, safeSub, id);
      this.tests.push(nuevoTest);
      localStorage.setItem('TESTS', JSON.stringify(this.tests));
    }else{
      let listaTest: TestModelo[] = [];
      let nuevoTest = this.getTestModelo(safeTitulo, safeSub, id);
      listaTest.push(nuevoTest);
      localStorage.setItem('TESTS', JSON.stringify(listaTest));
    }
    this.initTests();
    console.log('Guardado con exito')
  }

  getSiguienteId(): number{
    let max =0;
    for(let i=0;i!=this.tests?.length;i++){
      if(this.tests[i].id>max){
        max = this.tests[i].id;
      }
    }
    max = max+1;
    return max;
  }

  getTestModelo(titulo: string, sub: string, id: number): TestModelo{
    let testModelo: TestModelo = {
      id: id,
      titulo: titulo,
      subtitulo: sub,
      preguntas: [],
    }
    return testModelo;
  }

}
