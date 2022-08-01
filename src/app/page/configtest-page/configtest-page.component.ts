import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';

@Component({
  selector: 'app-test-page',
  templateUrl: './configtest-page.component.html',
  styleUrls: ['./configtest-page.component.css']
})
export class TestPageComponent implements OnInit {

  test: TestModelo= this.encontrarTest();
  constructor(private router:Router) { }

  ngOnInit(): void {
    $(()=>{
      this.setValoresTest();
    });
  }

  setValoresTest() {
    $('#titulo').val(this.test.titulo);
    $('#subtitulo').val(this.test.subtitulo);
  }


  encontrarTest(): TestModelo{
    let url = this.router.url;
    let id = url.split('/')[2];
    return StorageService.getTest(id);
  }

}
