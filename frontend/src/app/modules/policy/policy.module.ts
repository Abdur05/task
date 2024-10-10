import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PolicyListComponent } from './components/policy/policy-list/policy-list.component';
import { AddPolicyComponent } from './components/policy/add-policy/add-policy.component';
import { EditPolicyComponent } from './components/policy/edit-policy/edit-policy.component';


@NgModule({
  declarations: [
    PolicyListComponent,
    AddPolicyComponent,
    EditPolicyComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    FormsModule
  ]
})
export class PolicyModule { }
