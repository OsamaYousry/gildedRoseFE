import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from './components/table/table.component';
import { InputFormComponent } from './components/inputForm/input-form/input-form.component';
import { MatButtonModule } from '@angular/material/button';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import { SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    NgSlimScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: SLIMSCROLL_DEFAULTS,
    useValue: {
      barBackground: '#adb5bd', gridOpacity: 0.1, barWidth: 5,
      gridWidth: 1
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
