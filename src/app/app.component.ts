import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VerRespuestasComponent } from './dialog/ver-respuestas/ver-respuestas.component';
import { TestModelo } from './model/TestModelo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent  {

  tests: TestModelo[] | undefined;

  constructor(private httpClient: HttpClient, private router: Router, public dialog: MatDialog){}

  goPage(test: TestModelo){
    this.router.navigate([`test/${test.id}`]);
    console.log(test);
  }

  verRespuestas(){
    this.dialog.open(VerRespuestasComponent, {
      width: '500px',
    });
  }


  
}
