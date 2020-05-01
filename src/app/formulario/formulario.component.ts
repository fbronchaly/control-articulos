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
 idKey = 'img' + Math.floor(Math.random() * 1000000);
 file: File;
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

      })

  }

public procesarFile(e) {
    this.selectedFiles = e.target.files;
     this.file = this.selectedFiles.item(0);
  }



  onSubmit(instance){
 console.log(instance); // just to check if it worked 

 const uploadTask = this.storage.upload('/fotosArticulos/' + this.idKey, this.file);
    console.log ('Fotografía enviada')

 this.firebaseService.createUser(instance)
	.then(
	  res => {
	   console.log ('Datos envidados');
     alert('Datos enviados');
	  }).catch(err => console.log ('err', err.message))
}

}