import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  userObject;

  constructor() {
    console.log('Ive been constructed');
  }
}
