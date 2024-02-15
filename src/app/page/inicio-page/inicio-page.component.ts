import { Component, OnInit } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';
import { IniciarTestComponent } from 'src/app/dialog/iniciar-test/iniciar-test.component';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import { ToastService } from 'src/app/service/toastService';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit {

  tests: TestModelo[] = StorageService.initTests();
  toast: ToastService;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.toast= new ToastService(_snackBar);
  }

  ngOnInit(): void {
    
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
