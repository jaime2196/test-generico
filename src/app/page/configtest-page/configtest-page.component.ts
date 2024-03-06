import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestModelo } from 'src/app/model/TestModelo';
import { StorageService } from 'src/app/service/storageService';
import * as $ from 'jquery';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { EliminarTestComponent } from 'src/app/dialog/eliminar-test/eliminar-test.component';

@Component({
  selector: 'app-test-page',
  templateUrl: './configtest-page.component.html',
})
export class TestPageComponent implements OnInit {

  test: TestModelo= this.encontrarTest();
  constructor(private router:Router, public dialog: MatDialog) { }

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


  descargarJSON(){
    const blob = new Blob([
                 JSON.stringify(this.test)], 
                 {type: "text/plain;charset=utf-8"});
    saveAs(blob, `TESTS-${this.test.id}.json`);
  }

  eliminarTest(){
    this.dialog.open(EliminarTestComponent, {
      width: '400px',
      data: {
        dataKey: this.test
      }
    });
  }

}



