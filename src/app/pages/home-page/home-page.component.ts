import { Component } from '@angular/core';
import currencies from 'src/app/utilities/currencies';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor() {}
    payload:any;
    allCurrency:any = currencies.allCurrencies
    amountsList:number[] = [1,5,10,20,30]
    fromRate:number = 0;
    setAmountListRates(event:any) {
      this.payload = event
    }
    
}
