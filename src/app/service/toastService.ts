import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";

export class ToastService{

    snackBar: MatSnackBar;

    constructor(snackBar: MatSnackBar){
        this.snackBar=snackBar;
    }

    mostrarToast(msg: string){
        this.snackBar.open(msg, 'Cerrar');
      }
}

