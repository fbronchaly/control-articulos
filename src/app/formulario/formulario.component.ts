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
import {ArticuloModel} from './modelos/articulo-model';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
  
})
export class FormularioComponent implements OnInit {


   formulario;

  private datos: ArticuloModel;  // Modelo
     
 dateId = new Date();
 idKey;
 file: File;
 files: File[]=[];
 selectedFiles;


   


  constructor(
  private validator: ValidatorService,
  private fb:FormBuilder,
  private firebaseService: FirebaseService,
  private storage: AngularFireStorage
) {
      this.crearFormulario();
    }

  ngOnInit() {
     this.idKey = 'img' + Math.floor(Math.random() * 1000000);
     console.log(this.idKey);
 }


  crearFormulario() {


      this.formulario = this.fb.group({
      fecha: this.dateId,
      titular: ['', [ Validators.required]],
      autor: ['', [Validators.required ]],
      tituloArticulo1: ['', [ Validators.required] ],
      tituloArticulo2: ['', [ Validators.required] ],
      tituloArticulo3: ['', [ Validators.required] ],
      tituloArticulo4: ['', [ Validators.required] ],
      textoArticulo1: ['', [ Validators.required] ],
      textoArticulo2: ['', [ Validators.required] ],
      textoArticulo3: ['', [ Validators.required] ],
      textoArticulo4: ['', [ Validators.required] ],
      imagen: this.idKey,
      imagen1: this.idKey+1,
      imagen2: this.idKey+2,
      imagen3: this.idKey+3,
      imagen4: this.idKey+4,

      })

  }

public procesarFile(e) {
    this.selectedFiles = e.target.files;
    this.files.push(this.selectedFiles);
    console.log(this.files);
  }



  onSubmit(instance){
 console.log(instance); // just to check if it worked 

  if ( this.formulario.invalid ) {
    //Control Validaciones
   alert ('Rellene correctamente el formulario');
   Object.values(this.formulario.controls).forEach (control => { 
     control.markAsTouched(); 
      //console.log(control);   
   })
 };


// Envio de fotografías
for (let i=0;  this.files.length>i; i++){
      // Recoge imagen del formulario
    this.file = this.selectedFiles.item(i);
     console.log(this.idKey);
     // Envia fotografias a servidor
 const uploadTask = this.storage.upload('/fotosArticulos/' + this.idKey+[i], this.file);
 console.log(this.idKey+[i]);
    console.log ('Fotografía enviada')
    alert('Fotos enviados');
}
//Envio de datos
 this.firebaseService.createUser(instance)
	.then(
	  res => {
	   console.log ('Datos envidados');
     alert('Datos enviados');
     this.formulario.reset();
     this.files = [];
	  }).catch(err => console.log ('err', err.message))
}
/*
// Validaciones
get titularNovalido() {
  return  this.formulario.get('titular').invalid &&  this.formulario.get('titular').touched
}
get autorNovalido() {
  return  this.formulario.get('autor').invalid &&  this.formulario.get('autor').touched
}

get texto1Novalido() {
  return  this.formulario.get('textoArticulo1').invalid &&  this.formulario.get('textoArticulo1').touched
}

*/


}