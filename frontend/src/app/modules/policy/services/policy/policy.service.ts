import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    private http: HttpClient
  ) { }


  createpolicyDetail(data: any) {
    return this.http.post('http://localhost:4000/api/createTask', data).toPromise()
  }

  getAllpolicyDetail() {
    return this.http.get('http://localhost:4000/api/getAllTask').toPromise()
  }

  singlepolicyDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/getTaskById/${id}`).toPromise()
  }
  updatpolicyDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/updateTask/${data._id}`, data).toPromise()
  }
  deletePolicyDetail(id: any) {
    return this.http.delete(`http://localhost:4000/api/deleteTask/${id}`).toPromise()
  }
}
