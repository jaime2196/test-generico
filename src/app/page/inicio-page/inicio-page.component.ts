import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IniciarTestComponent } from 'src/app/dialog/iniciar-test/iniciar-test.component';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit {

  tests: TestModelo[] = StorageService.initTests();

  constructor(public dialog: MatDialog) {
     
  }

  ngOnInit(): void {
    
  }


  iniciarTest(test: TestModelo){
    this.dialog.open(IniciarTestComponent, {
      width: '250px',
      data: {
        dataKey: test
      }
    });
  }
  

}
