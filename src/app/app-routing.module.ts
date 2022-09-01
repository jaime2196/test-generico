import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddpreguntaPageComponent } from './page/addpregunta-page/addpregunta-page.component';
import { AddtestPageComponent } from './page/addtest-page/addtest-page.component';
import { InicioPageComponent } from './page/inicio-page/inicio-page.component';
import { RuntestPageComponent } from './page/runtest-page/runtest-page.component';
import { TestPageComponent } from './page/configtest-page/configtest-page.component';
import { VerRespuestasPageComponent } from './page/ver-respuestas-page/ver-respuestas-page.component';

const routes: Routes = [
  { path:'', component: InicioPageComponent },
  { path:'nuevotest', component: AddtestPageComponent },
  { path: 'modificartest/:id', component: AddpreguntaPageComponent },
  { path: 'test/:id', component: RuntestPageComponent },
  { path: 'configtest/:id', component: TestPageComponent },
  { path: 'respuestas', component: VerRespuestasPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
