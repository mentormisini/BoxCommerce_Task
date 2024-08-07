import {Component,inject} from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import { take } from 'rxjs';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent {
  currencyService = inject(CurrencyService);
  amount!:number;
  convertedValue:number | string | undefined;
  currencyCode$ = this.currencyService.currencyCode;
  fromCurrency!: {value:string};
  toCurrency!: {value:string};

  doExchange() {
    this.currencyService.startExchange(this.fromCurrency.value, this.toCurrency.value)
      .pipe(take(1))
      .subscribe((exchangeRate: any) => {
        let rateOf = exchangeRate.exchange_rates[this.toCurrency.value];
        if (this.amount) {
          this.convertedValue = (this.amount * Number(rateOf.toFixed(2))).toFixed(2);
        }
      });
  }
}
