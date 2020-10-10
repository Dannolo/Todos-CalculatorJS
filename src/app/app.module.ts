import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/todoList/dashboard/dashboard.component';
import { TodoComponent } from './components/todoList/todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditmodeDirective } from './directives/editmode.directive';
import { ViewmodeDirective } from './directives/viewmode.directive';
import { EditorComponent } from './components/todoList/editor/editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppRoutingModule } from './routes/app-routing/app-routing.module';
import { ButtonComponent } from './components/calculator/button/button.component';
import { ButtonPanelComponent } from './components/calculator/button-panel/button-panel.component';
import { DisplayComponent } from './components/calculator/display/display.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodoComponent,
    EditmodeDirective,
    ViewmodeDirective,
    EditorComponent,
    SidenavComponent,
    ButtonComponent,
    ButtonPanelComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    MatSidenavModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
