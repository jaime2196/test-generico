import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestPageComponent } from './page/test-page/test-page.component';

const routes: Routes = [
  { path: '**', component: AppComponent },
  {path: 'test/:id', component: TestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
