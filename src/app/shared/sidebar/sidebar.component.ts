import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get listaHistorial() {
    return this.gifsService.historial
  }

  buscar(termino: string) {
    this.gifsService.buscarGifs(termino);
  }

  constructor(private gifsService: GifsService) { }






}
