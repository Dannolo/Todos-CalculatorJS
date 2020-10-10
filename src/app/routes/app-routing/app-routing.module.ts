import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonPanelComponent } from 'src/app/components/calculator/button-panel/button-panel.component';
import { DashboardComponent } from 'src/app/components/todoList/dashboard/dashboard.component';

/**
 * Simple routing to toggle navigation between Calculator and Todo
 */

const routes: Routes = [
  { path: 'calculator', component: ButtonPanelComponent },
  { path: 'todo', component: DashboardComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }