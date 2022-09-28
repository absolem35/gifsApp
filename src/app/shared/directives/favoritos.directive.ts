import { Directive, Input, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Directive({
  selector: '[Favoritos]'
})
export class FavoritosDirective implements AfterViewInit {
  htmlElement:ElementRef<HTMLElement>;

@Input() set esFavorito(valor: number){
  if (valor >= 0) {
    this.htmlElement.nativeElement.style.fill = '#dc3545';
  }
}
  constructor(el: ElementRef) {
    this.htmlElement = el;
  }
  ngAfterViewInit(): void {
     
   }

   
  // misFavoritos(){
  //   const todosGifsFavoritos = JSON.parse(localStorage.getItem('favoritos')!);
  //   // const gifsActuales = JSON.parse(localStorage.getItem('ultima_busqueda')!)
    
  //   todosGifsFavoritos.forEach((element:Gif) => {
  //     const esFavorito = this.targetHtml.find((gif:ElementRef) => gif.nativeElement.id === element.id)
  //     console.log(esFavorito);
      
  //     if (esFavorito !== undefined) {
  //       esFavorito.nativeElement.style.fill = '#dc3545';
  //     }
  //   });

  // }

}
