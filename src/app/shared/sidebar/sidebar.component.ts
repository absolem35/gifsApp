import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Gif, The480_WStill } from 'src/app/gifs/interfaces/gif.interface';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
  h2{
    font-family:'Ubuntu Mono', monospace;
    font-weight:700;
  }
  h5{
    font-family:'Ubuntu Mono', monospace;
    font-weight:400;
  }
  img{
    height:80px;
    width:80px;
  }
  `
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public gifAleatorio:The480_WStill ={
    url:'',
    width:'',
    height:'',
    size:''
  }; 

  get listaHistorial() {
    return this.gifsService.historial
  }
  
  buscar(termino: string) {
    this.gifsService.buscarGifs(termino);
  }
  
  trending(){
    this.gifsService.gifTrending();
    this.gifsService.gifSidebar().subscribe(data =>  this.gifAleatorio = data );
  }

  coleccionDeFavoritos(){
    this.gifsService.gifFavoritos();
  }

  eliminarDeHistorial(index:number){
    this.gifsService.eliminarDeHistorial(index);
    this.trending();
  }
  
  
  constructor(private gifsService: GifsService) {
    
  }
  
  ngOnInit(): void {
    this.gifsService.gifSidebar().subscribe(data =>  this.gifAleatorio = data );
  }
  ngAfterViewInit(): void {
    
  }






}
