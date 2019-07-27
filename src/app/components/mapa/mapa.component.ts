import { MapaEditarComponent } from './../mapas/mapa-editar.component';
import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import {  MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];
  lat = 51.678418;
  lng = 7.809007;
  constructor( private snackBar: MatSnackBar, public dialog: MatDialog ) {
   if(localStorage.getItem('marcadores')){
     this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
   }
  }

  ngOnInit() {
  }

  agregarMarcador(e: any){
    const coords: {lat: number, lng: number} = e.coords;
    let nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador Agregado', 'Cerrar', {duration: 3000});
  }

  guardarStorage(){
    localStorage.setItem("marcadores", JSON.stringify(this.marcadores));
  }

  // borrarMarcador(m: Marcador){
  //   console.log(m);
  //   let marcadoresAux: Marcador[] = JSON.parse(localStorage.getItem('marcadores'));
  //   let idx = marcadoresAux.indexOf(m);
  //   marcadoresAux.splice(idx, 1);
  //   this.marcadores = marcadoresAux;
  // }
  borrarMarcador(i: number){
    this.marcadores.splice(i,1);
    this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar',{duration: 3000});
  }

  editarMarcador(marcador : Marcador  ){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, descripcion: marcador.descripcion}});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed and results are: ', result);
        if(!result){return ;}
        marcador.titulo = result.titulo;
        marcador.descripcion = result.descripcion;
        this.guardarStorage();
        this.snackBar.open('Marcador Editado', 'Cerrar',{duration: 3000});
      });
  }

}
