import { Pregunta } from "./Pregunta";

export interface TestModelo{
    id: number;
    titulo: string;
    subtitulo: string;
    preguntas: Pregunta[];
}