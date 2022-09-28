import { Component } from '@angular/core';

import { Gif } from '../interfaces/gif.interface';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [`
  svg{
    cursor: pointer;
  }
  img{
    width:auto;
    height:414px
  }
  `
  ]
})
export class ResultadosComponent {
 
  currentColor:string = '#22262A';
  
  get resultados() {
    return this.gifsService.resultados;
  }
  
  constructor(private gifsService: GifsService) {}
  
  misFavoritos(gifID:string){
    
    let esFavorito:number = -1;
    const todosGifsFavoritos = JSON.parse(localStorage.getItem('favoritos')!) || [];
  
    esFavorito = todosGifsFavoritos.findIndex((e:Gif) => e.id === gifID);

    return esFavorito
  }
  
  fillIcon(event:any,gifId:string):void{
    
    if (event.type ==='mouseover' && this.misFavoritos(gifId) === -1) {
      event.target.style.fill= '#dc3545';
    }else if(this.misFavoritos(gifId) >= 0){
      event.target.style.fill= '#dc3545';
    }
    else{
      event.target.style.fill= '#22262A';
    }
  }

  favorito(gif:Gif){
    const index = this.misFavoritos(gif.id);
    
    if (index === -1) {
      this.gifsService.guardarGifFavorito(gif);
      
    } else {
      this.gifsService.eliminarFavorito(index);
    }
  }
  

  
  


}
