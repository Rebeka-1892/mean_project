import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

export class Service {
  protected apiUrl = `${environment.apiUrl}`;
  constructor(protected http: HttpClient) { }
}
