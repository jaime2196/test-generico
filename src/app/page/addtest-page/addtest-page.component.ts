import { Component, OnInit } from '@angular/core';
import { MatSnackBar  } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import { ToastService } from 'src/app/service/toastService';

@Component({
  selector: 'app-addtest-page',
  templateUrl: './addtest-page.component.html'
})
export class AddtestPageComponent implements OnInit {

  tests: TestModelo[]=[] ;
  toast: ToastService;

  constructor(private router: Router, private _snackBar: MatSnackBar){ 
    this.toast= new ToastService(_snackBar);
  }

  ngOnInit(): void {
    this.tests = StorageService.initTests();
  }

  anadirPreguntas(){
    this.guardar();
  }


  guardar(){
    let titulo = $('#titulo').val();
    let safeTitulo = titulo==undefined?'':titulo.toString();
    let sub = $('#subtitulo').val();
    let safeSub =  sub==undefined?'':sub.toString();
    let id =this.getSiguienteId();
    let nuevoTest = this.getTestModelo(safeTitulo, safeSub, id);
    StorageService.setTest(nuevoTest);
    this.tests = StorageService.initTests();
    console.log('Guardado con exito')
    this.router.navigate(['/']);
  }

  getSiguienteId(): number{
    let max =0;
    for(let i=0;i<this.tests?.length;i++){
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
          try{
            this.guardarEnStorage(res);
          }catch(err){
            this.toast.mostrarToast("Imposible parsear el JSON, error: \n"+err);
          }
        }else{
          this.toast.mostrarToast('No es un fichero válido');
        }
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
