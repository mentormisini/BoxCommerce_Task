import { Component, inject } from '@angular/core';
import { LengthConverterService } from '../services/length-converter.service';

@Component({
  selector: 'app-length-converter',
  templateUrl: './length-converter.component.html',
  styleUrls: ['./length-converter.component.scss']
})
export class LengthConverterComponent {
  lengthConverterService = inject(LengthConverterService)
  value: number = 0;
  fromUnit: string = 'm';
  toUnit: string = 'm';
  result: number | null = null;

  units: string[] = ['m', 'yd', 'in'];


  convert() {
    this.result = this.lengthConverterService.convert(this.value, this.fromUnit, this.toUnit);
  }

}
