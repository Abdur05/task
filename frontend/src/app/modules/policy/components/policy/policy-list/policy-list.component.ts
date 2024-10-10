import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PolicyService } from '../../../services/policy/policy.service';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  policyDataformGroup: any = FormGroup
  policyDetail: any = []
  allpolicyDetail: any = []

  policyForm:any= FormArray;
  editingIndex: number | null = null;
  
  
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private policySer: PolicyService,
    

  ) {

  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllpolicyDetail()
  }



  async getAllpolicyDetail() {
    try {
      const result: any = await this.policySer.getAllpolicyDetail()
      if (result.status === true) {
        this.policyDetail = result.data
        this.allpolicyDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }



  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to permanently delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {

          const result: any = await this.policySer.deletePolicyDetail(data._id);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllpolicyDetail()
            return;
          }
          if (result.status === false) {
            this.getAllpolicyDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllpolicyDetail()
        }
      });
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.policyDetail = this.allpolicyDetail;
      return;
    }

    this.policyDetail = this.allpolicyDetail.filter((obj: any) =>
      ((obj.policyTitle.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.policyDetail = this.allpolicyDetail.filter((obj: any) =>
      ((obj.policyTitle.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }





}
