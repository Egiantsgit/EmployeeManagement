import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutheticationProfileServiceService {

constructor(private http: HttpClient) { }


getLoggedUserData(): any {
  return this.http.get('assets/mockdata2.json');
}

}
