import {Component, inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {CurrencyService} from "../../services/currency.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent {
  currencyService = inject(CurrencyService);
  datePipe = inject(DatePipe);
  selectedDate: any;
  historicalExchangeRates:any;
  exchangeRatesArray: { currency: string, rate: number }[] = [];
  baseCurrency:any;
  displayedColumns = ['currency', 'rate'];
  currencyCode$ = this.currencyService.currencyCode;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  dataSource:any = new MatTableDataSource(this.exchangeRatesArray);

  showHistorical() {
    this.currencyService.historicial(this.baseCurrency.value, this.formattedDate)
      .subscribe((historicalResp: any) => {
        this.historicalExchangeRates = historicalResp?.exchange_rates;
        this.dataSource = new MatTableDataSource(this.mapExchangeRates(this.historicalExchangeRates));
        this.dataSource.paginator = this.paginator;
      });
  }

  private mapExchangeRates(exchangeRates: any): any[] {
    return Object.keys(exchangeRates).map(key => ({
      currency: key,
      rate: exchangeRates[key]
    }));
  }


  get formattedDate() {
    const date = this.selectedDate.value;
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

}
