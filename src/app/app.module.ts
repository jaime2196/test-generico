import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestPageComponent } from './page/configtest-page/configtest-page.component';
import { TestComponent } from './component/test/test.component';
import { AddpreguntaPageComponent } from './page/addpregunta-page/addpregunta-page.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioPageComponent } from './page/inicio-page/inicio-page.component';
import { AddtestPageComponent } from './page/addtest-page/addtest-page.component';
import { RuntestPageComponent } from './page/runtest-page/runtest-page.component';
import { SaniticeHtmlPipe } from './pipe/sanitice-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EliminarTestComponent } from './dialog/eliminar-test/eliminar-test.component';
import { IniciarTestComponent } from './dialog/iniciar-test/iniciar-test.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    TestComponent,
    AddpreguntaPageComponent,
    InicioPageComponent,
    AddtestPageComponent,
    RuntestPageComponent,
    SaniticeHtmlPipe,
    EliminarTestComponent,
    IniciarTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    HttpClientModule, BrowserAnimationsModule, 
    MatDialogModule, MatSnackBarModule, 
    MatButtonModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
