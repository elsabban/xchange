import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import currencies from 'src/app/utilities/currencies';
import { HttpService } from 'src/app/utilities/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private http:HttpService) {}
    payload:any;
    allCurrency:any = currencies.allCurrencies
    amountsList:number[] = [1,5,10,20,30]
    fromRate:number = 0;
    setAmountListRates(event:any) {
      this.payload = event
      this.http.getConvertionRate(event.from,event.to).subscribe(
        (res:any) => {
           this.fromRate = res.conversion_rate;
           
        }
      ) 
      
    }
    
}
