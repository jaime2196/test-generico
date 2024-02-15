import { MatSnackBar } from "@angular/material/snack-bar";

export class ToastService{

    snackBar: MatSnackBar;

    constructor(snackBar: MatSnackBar){
        this.snackBar=snackBar;
    }

    mostrarToast(msg: string){
        this.snackBar.open(msg, 'Cerrar');
      }
}

