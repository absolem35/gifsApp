import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SerachGifsResponse, Gif, GifResponse, The480_WStill } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl = 'http://api.giphy.com/v1/gifs';
  private apiKey: string = 'Vy6Q79PFDdjC1CAOAbQdUFIDB1aAltka';
  private _historial: string[] = [];

  public resultados: Gif[] = [];
  public favoritos: Gif[] = [];
  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.gifSidebar();
    this.resultados = JSON.parse(localStorage.getItem('ultima_busqueda')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 5)
      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SerachGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('ultima_busqueda', JSON.stringify(this.resultados));
      })
  }

  gifTrending(){
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10');

    this.http.get<SerachGifsResponse>(`${this.servicioUrl}/trending`, { params })
    .subscribe(resp =>{
      this.resultados = resp.data;
      localStorage.setItem('ultima_busqueda', JSON.stringify(this.resultados));
    })
  }
  gifFavoritos(){
    this.resultados = JSON.parse(localStorage.getItem('favoritos')!) || [];
  }

  gifSidebar():Observable<The480_WStill>{

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '1')
      .set('tag', 'cool');

     return this.http.get<GifResponse>(`${this.servicioUrl}/random`, { params })
     .pipe(map((r)=> r.data.images.downsized_medium))
  }

  guardarGifFavorito(gif:Gif){
    
    this.favoritos.unshift(gif)
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  eliminarFavorito(index:number){
  const todosGifsFavoritos = JSON.parse(localStorage.getItem('favoritos')!)|| [];

  this.favoritos.splice(index,1)
  todosGifsFavoritos.splice(index,1);

  localStorage.setItem('favoritos', JSON.stringify(todosGifsFavoritos));
    this.gifFavoritos();
  }

  eliminarDeHistorial(index:number){
    this._historial.splice(index,1);
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }

}
