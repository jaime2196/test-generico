import { Component, OnInit } from '@angular/core';
import { TestModelo } from 'src/app/model/TestModelo';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  test: TestModelo= {
    id:0,
    titulo: 'Ejemplo',
    subtitulo: 'Ejemplo',
    preguntas: [],
  };
  constructor() { }

  ngOnInit(): void {
  }

}
