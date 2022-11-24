import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterComponent } from './components/converter/converter.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    ConverterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    AppRoutingModule
  ],
  exports:[
    ConverterComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
