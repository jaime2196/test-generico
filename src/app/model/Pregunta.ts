import { Opciones } from "./Opciones";

export interface Pregunta{

    
    id: number;
    tipo: PreguntaTipo;
    titulo: string;
    opciones: Opciones[];
    solucion: number[];
    

    /*constructor(titulo:string, opciones: Opciones[], solucion: number[]){
        this.titulo=titulo;
        this.opciones= opciones;
        this.solucion = solucion;
    }*/

    
}

export enum PreguntaTipo {
    RADIO = 'RADIO',
    CHECK = 'CHECK',
  }