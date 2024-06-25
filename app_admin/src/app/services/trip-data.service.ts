import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip'
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  url = 'http://localhost:3000/api/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }
  addTrip(formData: Trip, token: string | null): Observable<Trip> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Trip>(this.url, formData, { headers });
  }
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }
  updateTrip(formData: Trip, token: string | null): Observable<Trip> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Trip>(this.url + '/' + formData.code, formData, { headers });
  }
  deleteTrip(tripCode: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(this.url + '/' + tripCode, { headers });
  }
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
  private async makeAuthApiCall(urlPath: string, user: User):
    Promise<AuthResponse> {
      const url = 'http://localhost:3000/api/' + urlPath;
      try{
      const response$ = this.http
      .post<AuthResponse>(url, user);
      const response = await lastValueFrom(response$);
      return response;
      } catch (err) {
        console.error(err);
        return Promise.reject(err);
      }
  }
}
