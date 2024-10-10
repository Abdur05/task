import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'policy',
    pathMatch: 'full'
  },
   {
    path: 'policy',
    loadChildren: () => import('./modules/policy/policy.module').then(m => m.PolicyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
