import {Component, inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CurrencyService} from "../../services/currency.service";
import {take} from "rxjs";
import {DateFormatterService} from "../../services/shared/date-formatter.service";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  currencyService$ = inject(CurrencyService);
  dateFormatterService = inject(DateFormatterService);
  selectedDate!: string;
  historicalExchangeRates!:{ currency: string, rate: number };
  exchangeRatesArray: { currency: string, rate: number }[] = [];
  baseCurrency!:{value:number};
  displayedColumns = ['currency', 'rate'];
  currencyCode$ = this.currencyService$.currencyCode;
  dataSource = new MatTableDataSource(this.exchangeRatesArray);

  showHistorical() {
    this.currencyService$.historicial(this.baseCurrency.value, this.dateFormatterService.format(this.selectedDate))
      .pipe(take(1))
      .subscribe((historicalResp) => {
        this.historicalExchangeRates = historicalResp?.exchange_rates;
        this.dataSource = new MatTableDataSource(this.mapExchangeRates(this.historicalExchangeRates));
        this.dataSource.paginator = this.paginator;
      });
  }

  //since the data we receive as object we need to convert them to array to display in table.
  private mapExchangeRates(exchangeRates: any){
    return Object.keys(exchangeRates).map(key => ({
      currency: key,
      rate: exchangeRates[key]
    }));
  }

}
