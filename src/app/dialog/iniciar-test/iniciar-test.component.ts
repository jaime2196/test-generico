import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { EliminarTestComponent } from '../eliminar-test/eliminar-test.component';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfiguracionTest, TestTipo } from 'src/app/model/ConfiguracionTest';
import { ToastService } from 'src/app/service/toastService';

@Component({
  selector: 'app-iniciar-test',
  templateUrl: './iniciar-test.component.html'
})
export class IniciarTestComponent implements OnInit {

  test: TestModelo=this.data.dataKey;
  tipoDeTests=TestTipo;
  toast: ToastService;

  constructor(public dialogRef: MatDialogRef<EliminarTestComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) { 
      this.toast= new ToastService(_snackBar);
    }

  ngOnInit(): void {
    
  }


  cancelar(){
    this.dialogRef.close();
  }

  iniciar(){
    if(this.validar()){
      this.dialogRef.close();
      this.router.navigate([`/test/${this.test.id}`], {state:{data: this.getValoresInitTest()}})
    }
  }

  validar(): boolean{
    let npreguntas = $('#npreguntas').val();
    let npreguntasSafe= npreguntas==undefined?'-1':npreguntas.toString();
    let npreguntasInt=parseInt(npreguntasSafe);
    if(isNaN(npreguntasInt)||npreguntasInt==-1){
      this.toast.mostrarToast('Numero no valido');
      return false;
    }
    if(npreguntasInt<1 || npreguntasInt>this.test.preguntas.length){
      this.toast.mostrarToast('Numero no valido');
      return false;
    }

    let tipoTest = $('input[name="tipo-test"]:checked').val();
    if(tipoTest==undefined){
      this.toast.mostrarToast('Selecciona un tipo de test');
      return false;
    }

    return true;
  }

  getValoresInitTest(): ConfiguracionTest{
    let npreguntas = $('#npreguntas').val();
    let npreguntasSafe= npreguntas==undefined?'-1':npreguntas.toString();
    let npreguntasInt=parseInt(npreguntasSafe);

    let tipoTest = $('input[name="tipo-test"]:checked').val();
    let resTipo = TestTipo.normal;
    if(tipoTest==TestTipo.normal){
      resTipo = TestTipo.normal;
    }else if(tipoTest==TestTipo.aleatorio){
      resTipo = TestTipo.aleatorio;
    }else if(tipoTest==TestTipo.mas_falladas){
      resTipo = TestTipo.mas_falladas;
    }else if(tipoTest==TestTipo.mas_ocurrencias){
      resTipo = TestTipo.mas_ocurrencias;
    }else if(tipoTest==TestTipo.menos_falladas){
      resTipo = TestTipo.menos_falladas;
    }else if(tipoTest==TestTipo.menos_ocurrencias){
      resTipo = TestTipo.menos_ocurrencias;
    }

    let config: ConfiguracionTest={
      numeroPreguntas: npreguntasInt,
      tipoTest: resTipo
    }
    return config;
  }


}
