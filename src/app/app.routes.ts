import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { FormAutorComponent } from './form-autor/form-autor.component';




const APP_ROUTES: Routes = [
  { path: 'formulario', component: FormularioComponent },
   { path: 'autor', component: FormAutorComponent },

 { path: '**', pathMatch: 'full', redirectTo: 'formulario' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);