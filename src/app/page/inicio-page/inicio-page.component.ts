import { Component, OnInit } from '@angular/core';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit {

  tests: TestModelo[] = StorageService.initTests();

  constructor() {
     
  }

  ngOnInit(): void {
    
  }

  

}
