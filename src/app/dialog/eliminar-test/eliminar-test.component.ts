import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import { StorageService } from 'src/app/service/storageService';


@Component({
  selector: 'app-eliminar-test',
  templateUrl: './eliminar-test.component.html',
})
export class EliminarTestComponent  {

  nombreTest: string='';

  constructor(public dialogRef: MatDialogRef<EliminarTestComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.nombreTest=this.data.dataKey.titulo;
    }

  cancelar(){
    this.dialogRef.close();
  }

  eliminar(){
    StorageService.eliminarTest(this.data.dataKey);
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

}


