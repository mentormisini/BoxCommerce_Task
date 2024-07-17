import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LengthConverterService {

  constructor() { }

  convert(value: number, fromUnit: string, toUnit: string): number {
    const conversions: { [key: string]: number } = {
      'm': 1,
      'yd': 0.9144,
      'in': 0.0254
    };

    // Convert the value to meters first
    const valueInMeters = value * conversions[fromUnit];

    // Convert the value from meters to the desired unit
    return valueInMeters / conversions[toUnit];
  }
}
