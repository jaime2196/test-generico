export interface ConfiguracionTest{
    numeroPreguntas: number;
    tipoTest: TestTipo;
}


export enum TestTipo {
    aleatorio = 'Aleatorio',
    menos_ocurrencias = 'Preguntas que salen menos',
    mas_ocurrencias = 'Preguntas que salen mas',
    mas_falladas = 'Preguntas mas falldas',
    menos_falladas = 'Preguntas menos falladas',
    normal = 'Normal',
  }