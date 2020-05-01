import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import {ArticuloModel} from './modelos/articulo-model';

import { Observable } from 'rxjs';


@Injectable()
export class FirebaseService {




constructor( private firestore: AngularFirestore  ) {}

datosArticulo;



  createUser(value){
  return this.firestore.collection('articulos').add({
  fecha: value.fecha,
  titular: value.titular,
  autor: value.autor,
  tituloArticulo1: value.tituloArticulo1,
  tituloArticulo2: value.tituloArticulo2,
  tituloArticulo3: value.tituloArticulo3,
  tituloArticulo4: value.tituloArticulo4,
  textoArticulo1: value.textoArticulo1,
  textoArticulo2: value.textoArticulo2,
  textoArticulo3: value.textoArticulo3,
  textoArticulo4: value.textoArticulo4,
  imagen: value.imagen
})
  };








  
leeArticulos() {
    return this.firestore.collection('articulos').snapshotChanges();
  }






}