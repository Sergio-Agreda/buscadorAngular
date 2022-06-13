import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "BzPVialYjFZb4RdHx5tAL3Ffy3hmaMuu";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";

  private _historial: string[] = [];

  
  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial]; // ... para que no cambie el valor al _historial

  }

  constructor ( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('ultimosResultados')!) || [];

    // if ( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );

    // }

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();
    
    //Si no lo incluye recien lo inserto si ya esta no lo inserta en la busqueda
    if (!this._historial.includes(query)) {

      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      //Guarda todo en el localStorage de la web
      localStorage.setItem('historial', JSON.stringify( this._historial ) ) //JSON.stringify( this._historial ) convierte a un arreglo a un string
     
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '20')
          .set('q', query)       

    this.http.get <SearchGifsResponse> (`${this.servicioUrl}/search`, { params })
      .subscribe( (resp ) =>{
        this.resultados = resp.data;
        localStorage.setItem('ultimosResultados', JSON.stringify( this.resultados ))
        
      });

    

  }

}