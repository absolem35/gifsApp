import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerachGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl = 'http://api.giphy.com/v1/gifs';
  private apiKey: string = 'Vy6Q79PFDdjC1CAOAbQdUFIDB1aAltka';
  private _historial: string[] = [];

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('ultima_busqueda')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SerachGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('ultima_busqueda', JSON.stringify(this.resultados));
      })
  }


}
