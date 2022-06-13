import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {
// ! = que el objeto nunca sera nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef <HTMLInputElement>;

  busqueda(  ){

    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length === 0 ) { return }

    this.gifsService.buscarGifs( valor )

    this.txtBuscar.nativeElement.value = '';
    
    
  }

  constructor (private gifsService: GifsService){

  }

}
