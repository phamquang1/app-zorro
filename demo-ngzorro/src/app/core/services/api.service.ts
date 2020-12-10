import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpHeaders = new HttpHeaders();
  private httpOptions = {};
  constructor(
    private httpClient: HttpClient, private router: Router,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      })
    };
    this.httpHeaders = new HttpHeaders(this.httpOptions);
  }
  // api get method
  // tslint:disable-next-line:typedef
  get(uri: string, params?: HttpParams) {
    return this.httpClient
      .get( uri, { headers: this.httpHeaders, params })
      .pipe(map(this.extractData));
  }

  // api post method
  // tslint:disable-next-line:typedef
  post(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .post( uri, data, {
        headers: this.httpHeaders,
        params
      })
      .pipe(map(this.extractData));
  }

  // api post method form-data
  // tslint:disable-next-line:typedef
  postFormData(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient.post( uri, data, { params }).pipe(map(this.extractData));
  }

  // api put method
  // tslint:disable-next-line:typedef
  put(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .put( uri, data, {
        headers: this.httpHeaders,
        params
      })
      .pipe(map(this.extractData));
  }

  // api put method
  // tslint:disable-next-line:typedef
  putFormData(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .put( uri, data, {
        params
      })
      .pipe(map(this.extractData));
  }

  // put blob
  // tslint:disable-next-line:typedef
  putDownloadFile(uri: string, data?: any, params?: HttpParams) {
    return this.httpClient.put( uri, data, {
      headers: this.httpHeaders,
      responseType: 'blob' as 'json',
      params
    });
  }

  // api delete method
  // tslint:disable-next-line:typedef
  delete(uri: string, params?: HttpParams) {
    return this.httpClient
      .delete( uri, {
        headers: this.httpHeaders,
        params
      })
      .pipe(map(this.extractData));
  }

  // tslint:disable-next-line:typedef
  private extractData(res: HttpResponse<object>) {
    const body = res;
    return body || {};
  }
}
