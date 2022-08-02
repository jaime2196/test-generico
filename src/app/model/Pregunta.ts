import { Estadistica } from "./Estadistica";
import { Opciones } from "./Opciones";

export interface Pregunta{

    
    id: number;
    tipo: PreguntaTipo;
    titulo: string;
    opciones: Opciones[];
    solucion: number[];
    estadistica: Estadistica;

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