import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { EliminarTestComponent } from '../eliminar-test/eliminar-test.component';

@Component({
  selector: 'app-iniciar-test',
  templateUrl: './iniciar-test.component.html'
})
export class IniciarTestComponent implements OnInit {

  test: TestModelo=this.data.dataKey;

  constructor(public dialogRef: MatDialogRef<EliminarTestComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    
    }

  ngOnInit(): void {
  }


  cancelar(){
    this.dialogRef.close();
  }

  iniciar(){
    this.dialogRef.close();
    this.router.navigate([`/test/${this.test.id}`])
  }

}
