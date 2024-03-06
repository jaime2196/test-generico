import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IniciarTestComponent } from 'src/app/dialog/iniciar-test/iniciar-test.component';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import { ToastService } from 'src/app/service/toastService';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html'
})
export class InicioPageComponent {

  tests: TestModelo[] = StorageService.initTests();
  toast: ToastService;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.toast= new ToastService(_snackBar);
  }


  iniciarTest(test: TestModelo){
    if(test.preguntas.length>0){
      this.dialog.open(IniciarTestComponent, {
        width: '500px',
        data: {
          dataKey: test
        }
      });
    }else{
      this.toast.mostrarToast("El test no tiene preguntas");
    }
    
  }
  

}
