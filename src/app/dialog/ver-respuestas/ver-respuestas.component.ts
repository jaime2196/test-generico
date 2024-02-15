import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import { ToastService } from 'src/app/service/toastService';
import * as $ from 'jquery';

@Component({
  selector: 'app-ver-respuestas',
  templateUrl: './ver-respuestas.component.html',
})
export class VerRespuestasComponent implements OnInit {

  tests: TestModelo[] = [];
  toast: ToastService;

  constructor(public dialogRef: MatDialogRef<VerRespuestasComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) { 
      this.toast= new ToastService(_snackBar);
    }

  ngOnInit(): void {
    this.tests = StorageService.initTests();
  }


  cancelar(){
    this.dialogRef.close();
  }

  iniciar(){
    let testsseleccionados = this.getTestSelecionados();
    if(this.validar(testsseleccionados)){
      this.dialogRef.close();
      this.router.navigate([`/respuestas`], {state:{data: testsseleccionados}});
      
    }else{
      this.toast.mostrarToast("Selecciona al menos un test");
    }
  }

  validar(tests: String[]): boolean{
    if(this.tests.length == 0){
      return false;
    }
    
    return true;
  }

  getTestSelecionados(): String[]{
    let res: String[] = [];
    let checks=$('.check-opciones');
    for(let i=0;i!=checks.length;i++){
      if($(checks[i]).is(':checked')){
        let valor = checks[i].getAttribute('value');
        let safeValor = valor == null? '':valor;
        res.push(safeValor);
      }
    }
    console.log(res);
    return res;
  }

}
