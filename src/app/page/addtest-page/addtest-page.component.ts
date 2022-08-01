import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';

@Component({
  selector: 'app-addtest-page',
  templateUrl: './addtest-page.component.html',
  styleUrls: ['./addtest-page.component.css']
})
export class AddtestPageComponent implements OnInit {

  tests: TestModelo[]=[] ;

  constructor(private router: Router){ 
  }

  ngOnInit(): void {
    this.tests = StorageService.initTests();
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
    let id =this.getSiguienteId();
    let nuevoTest = this.getTestModelo(safeTitulo, safeSub, id);
    //localStorage.setItem(`TESTS-${id}`, JSON.stringify(nuevoTest));
    StorageService.setTest(nuevoTest);
    this.tests = StorageService.initTests();
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

  importar(){
    let files = $('#fichero').prop('files');
    if(files.length>0){
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (typeof fileReader.result === 'string') {
          let res = fileReader.result;
          this.guardarEnStorage(res);
        }
        //console.log(fileReader.result);
      }
      fileReader.readAsText(files[0]);
    }
  }

  guardarEnStorage(testStr: string){
    let test: TestModelo = JSON.parse(testStr);
    StorageService.setTest(test);
    this.router.navigate(['/']);
  }

}
