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
 file1: File;
 file2: File;
 file3: File;
 conjuntoFile:any[]=[];


 fotosElegidas: File[]=[];


 selectedFiles;
 selectedFiles1;
 selectedFiles2;
 selectedFiles3; 

 uploadTask;



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
      imagen: this.idKey+0,
      imagen1: this.idKey+1,
      imagen2: this.idKey+2,
      imagen3: this.idKey+3,
      imagen4: this.idKey+4,

      })

  }

public procesarFile(e) {
   if(e.target.files && e.target.files.length) {
    this.selectedFiles = e.target.files;
   this.file = this.selectedFiles.item(0);
   console.log (this.file);
   this.conjuntoFile.push(this.file);
   console.log (this.conjuntoFile);
  
    //this.fotosElegidas.push (this.file);
   console.log (this.file.name);
        this.storage.upload('/fotosArticulos/' + this.idKey, this.conjuntoFile[0]);
        console.log ('Fotografía enviada'+ " " + this.idKey );
       }
   }
  
/*
public procesarFile1(e) {
   if(e.target.files && e.target.files.length) {
    this.selectedFiles1 = e.target.files;
    this.file1 = this.selectedFiles1.item(0);
    this.fotosElegidas.push (this.file1);
    
   }
  }

  public procesarFile2(e) {
     if(e.target.files && e.target.files.length) {
    this.selectedFiles2 = e.target.files;
    this.file2 = this.selectedFiles2.item(0);
    this.fotosElegidas.push (this.file2);
   
     }
  }
    public procesarFile3(e) {
       if(e.target.files && e.target.files.length) {
    this.selectedFiles3 = e.target.files;
    this.file3 = this.selectedFiles3.item(0);
    
       }
  }
*/

  onSubmit(instance){
 console.log(instance); // just to check if it worked 

/*  if ( this.formulario.invalid ) {
    //Control Validaciones
   alert ('Rellene correctamente el formulario');
   Object.values(this.formulario.controls).forEach (control => { 
     control.markAsTouched(); 
      //console.log(control);   
   })
 };*/


// Envio de fotografías

      // Recoge imagen del formulario++++++++++++++++++++

     // Envia fotografias a servidor
if (this.fotosElegidas.length>10){
     for (let i; this.fotosElegidas.length>0; i++  ){
       console.log (this.fotosElegidas.length)
this.storage.upload('/fotosArticulos/' + this.idKey+[0], this.fotosElegidas[i]);
console.log ('Fotografía enviada'+ " " + this.idKey+[i] );
     }
}
/*
//++++++++++++++++++++++++++++++++++++++++++++++++++++++

this.file1 = this.selectedFiles1.item(0);
     // Envia fotografias a servidor
 const uploadTask1 = this.storage.upload('/fotosArticulos/' + this.idKey+1, this.file1);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
this.file2= this.selectedFiles2.item(0);     
     // Envia fotografias a servidor
 const uploadTask2 = this.storage.upload('/fotosArticulos/' + this.idKey+2, this.file2);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++
this.file3= this.selectedFiles3.item(0);  
     // Envia fotografias a servidor
 const uploadTask3 = this.storage.upload('/fotosArticulos/' + this.idKey+3, this.file3);
*/




    

//Envio de datos
 this.firebaseService.createUser(instance)
	.then(
	  res => {
	   console.log ('Datos envidados');
     alert('Datos enviados');
     this.formulario.reset();
     this.idKey;
     this.crearFormulario();
   
     
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