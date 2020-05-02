// Modulos
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//Servicios
import {FirebaseService} from '../firebase.service';
import { ValidatorService } from '../validator.service';

//Modelo
import {ArticuloModel} from '../modelos/articulo-model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Autor } from '../modelos/articulo-model';
import { forEach } from '@firebase/firestore/dist/lib/src/util/obj';

@Component({
  selector: 'app-form-autor',
  templateUrl: './form-autor.component.html',
  styleUrls: ['./form-autor.component.css']
})
export class FormAutorComponent implements OnInit {

//public autor: Autor;  // Modelo
autor;
idKey = 'img' + Math.floor(Math.random() * 1000000);
file: File;
selectedFiles;

   
  constructor(
  private validator: ValidatorService,
  private fb:FormBuilder,
  private firebaseService: FirebaseService,
  private storage: AngularFireStorage
) {
      this.crearFormularioAutor();
    }

  ngOnInit() {
 }


  crearFormularioAutor() {

      this.autor = this.fb.group({
  
      nombre: ['', [ Validators.required]],
      avatar: this.idKey,
      mail: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
      

      })

  }

public procesarFile(e) {
    this.selectedFiles = e.target.files;
     this.file = this.selectedFiles.item(0);
  }



  onSubmit(instance){
 console.log(instance); // just to check if it worked 

 if ( this.autor.invalid ) {
   //alert ('Rellene correctamente el formulario');
   Object.values(this.autor.controls).forEach (control => { 
     control.markAsTouched(); 
      //console.log(control);   
   })
 };

 const uploadTask = this.storage.upload('/fotosArticulos/' + this.idKey, this.file);
    console.log ('Fotografía enviada')

 this.firebaseService.createAutor(instance)
	.then(
	  res => {
	   console.log ('Datos envidados');
     alert('Datos envidados')
	  }).catch(err => console.log ('err', err.message))
}

get nombreNovalido() {
  return  this.autor.get('nombre').invalid &&  this.autor.get('nombre').touched
}

get mailNovalido() {
  return  this.autor.get('mail').invalid &&  this.autor.get('mail').touched
}


}