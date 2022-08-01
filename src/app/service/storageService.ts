import { TestModelo } from "../model/TestModelo";

export class StorageService{


    public static initTests(): TestModelo[] {
        let tests: TestModelo[] = [];
        for(let key in localStorage){
            if(key.startsWith('TESTS-')){
                let testsStr = localStorage.getItem(key);
                if(testsStr!=null){
                    tests.push(JSON.parse(testsStr));
                }   
            }
        }
        return tests;
    }

    public static getTest(id: string){
        let tests = StorageService.initTests();
        let test: TestModelo ={
            id:-1,
            titulo: '',
            subtitulo: '',
            preguntas: [],
          }; 
          for(let i=0;i!=tests.length;i++){
            if(id==tests[i].id.toString()){
              test =  tests[i];
            }
          }
          return test;
    }

    public static setTest(test: TestModelo){
        localStorage.setItem(`TESTS-${test.id}`, JSON.stringify(test));
    }

    public static eliminarTest(test: TestModelo){
        localStorage.removeItem(`TESTS-${test.id}`);
    }

}