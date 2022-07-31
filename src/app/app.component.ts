import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestModelo } from './model/TestModelo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  tests: TestModelo[] | undefined;

  constructor(private httpClient: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.depurar();
  }


  depurar(){
    this.httpClient.get("assets/PSD_ejemplo.json").subscribe(data =>{
      let str: TestModelo[] =  data as TestModelo[];
      this.tests=str;
    })
  }

  goPage(test: TestModelo){
    this.router.navigate([`test/${test.id}`]);
    console.log(test);
  }
  
}
