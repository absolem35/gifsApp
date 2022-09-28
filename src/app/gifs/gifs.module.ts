import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { GifsPagesComponent } from './gifs-pages/gifs-pages.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GifsPagesComponent,
    BusquedaComponent,
    ResultadosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    GifsPagesComponent
  ]

})
export class GifsModule { }
