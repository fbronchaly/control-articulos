import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from './environments/environment';
import { APP_ROUTING } from './app.routes';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioComponent } from './formulario/formulario.component';
import { ValidatorService } from './validator.service';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FirebaseService } from './firebase.service';
import { HttpClientModule } from '@angular/common/http';
import {NavbarComponent} from './shared/navbar/navbar.component';




@NgModule({
  imports:      [ 
  BrowserModule,
  FormsModule,
  NgbModule,
  AngularFirestoreModule,
  ReactiveFormsModule,  
  AngularFireModule.initializeApp(environment.firebase),
  HttpClientModule,
  APP_ROUTING,
  RouterModule,
  NgbPaginationModule,
  NgbAlertModule


 	],
  declarations: [ AppComponent, HelloComponent, FormularioComponent, CabeceraComponent, NavbarComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ValidatorService, FirebaseService]
})
export class AppModule { }
