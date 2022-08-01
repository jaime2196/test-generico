import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestPageComponent } from './page/test-page/test-page.component';
import { TestComponent } from './component/test/test.component';
import { AddpreguntaPageComponent } from './page/addpregunta-page/addpregunta-page.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioPageComponent } from './page/inicio-page/inicio-page.component';
import { AddtestPageComponent } from './page/addtest-page/addtest-page.component';
import { RuntestPageComponent } from './page/runtest-page/runtest-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    TestComponent,
    AddpreguntaPageComponent,
    InicioPageComponent,
    AddtestPageComponent,
    RuntestPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
