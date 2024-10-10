import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../../services/policy/policy.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.css']
})
export class EditPolicyComponent {


  policyDataformGroup: any = FormGroup
  isSubmitted: any = false;

  policyId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private policySer: PolicyService,
    private avtivateRouter: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.policyId = this.avtivateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getSinglePolicyDetails()
  }



  data() {
    this.policyDataformGroup = this.fb.group({
      _id: ['', Validators.required],
      policyTitle: ['', [Validators.required]],
      description: ['', Validators.required],
    });
  }



  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.policyDataformGroup.value);

      if (this.policyDataformGroup.invalid)
        return

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.policyDataformGroup.value.createdOn = fullDate
      this.policyDataformGroup.value.changedOn = fullDate

      const result: any = await this.policySer.updatpolicyDetail(this.policyDataformGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/policy/policy-list/'])
        return
      }
      if (result.status === false) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }


    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }

  async getSinglePolicyDetails() {
    try {
      const result: any = await this.policySer.singlepolicyDetail(this.policyId);
      if (result.status === true) {
        this.policyDataformGroup.patchValue(result.data)
      }
    } catch (error: any) {
      console.log(error)
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



}
