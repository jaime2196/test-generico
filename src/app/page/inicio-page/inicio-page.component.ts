import { Component, OnInit } from '@angular/core';
import { TestModelo } from 'src/app/model/TestModelo';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit {

  tests: TestModelo[] | undefined;

  constructor() { 
    this.initTests();
  }

  ngOnInit(): void {
    
  }

  initTests(){
    let testsStr = localStorage.getItem('TESTS');
    if(testsStr!=null){
      this.tests=JSON.parse(testsStr);
    }
  }

}
