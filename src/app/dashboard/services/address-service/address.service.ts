import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  searchAddress(cep: string) {
    cep = cep.replace(/\D/g, '');

    if(cep !== '') {
      const validateCep = /^[0-9]{8}$/;

      if (validateCep.test(cep)) {
        console.log('Request' + cep)
        return this.httpClient.get('https://viacep.com.br/ws/' + cep + '/json')
      }
      else {
        return undefined
      }
    }
    else {
      return undefined
    }
  }

}
