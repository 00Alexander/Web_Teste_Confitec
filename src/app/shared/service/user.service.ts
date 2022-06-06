import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;

  httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

    constructor(private httpClient: HttpClient){
      this.url = `${environment.apiUrlUser}`;
    }

    public register(formData): Observable<any>{
      return this.httpClient.post(this.url, formData, {responseType : "text"})
    }

    public update(formData):Observable<any>{
      return this.httpClient.put(this.url, formData,  {responseType : "text"})
    }

    getById(id: string): Observable<any>{
      return this.httpClient.get(`${this.url}/${id}`);
    }

    getAll(){
      return this.httpClient.get(this.url);
    }

    delete(id: string): Observable<any>{
      return this.httpClient.delete(`${this.url}/${id}`,  {responseType : "text"});
    }
}
