import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class CurrencyService{
  protected readonly _http = inject(HttpClient);
  private _currencyAPI= 'https://exchange-rates.abstractapi.com/v1/live/?api_key=4b47dc89d2a44e8faccd546b160f173f&'

  startExchange(base: string, target: string):Observable<any>{
    return this._http.get(`${this._currencyAPI}/&base=${base}&target=${target}`)
  }
    historicial(base: number, date: any):Observable<any>{
    return this._http.get(`${this._currencyAPI}/&base=${base}&date=${date}`)
  }

  // I added manually because the free api abstractapi.com doesn't have any specific API for currency codes.
  public currencyCode: any[] = [
    { value: 'EUR' },
    { value: 'JPY' },
    { value: 'BGN' },
    { value: 'CZK' },
    { value: 'DKK' },
    { value: 'GBP' },
    { value: 'HUF' },
    { value: 'PLN' },
    { value: 'RON' },
    { value: 'SEK' },
    { value: 'CHF' },
    { value: 'USD' },
    { value: 'ISK' },
    { value: 'NOK' },
    { value: 'TRY' },
    { value: 'AUD' },
    { value: 'BRL' },
    { value: 'CAD' },
    { value: 'CNY' },
    { value: 'HKD' },
    { value: 'IDR' },
    { value: 'ILS' },
    { value: 'INR' },
    { value: 'KRW' },
    { value: 'MXN' },
    { value: 'MYR' },
    { value: 'NZD' },
    { value: 'PHP' },
    { value: 'SGD' },
    { value: 'THB' },
    { value: 'ZAR' }
];

}
