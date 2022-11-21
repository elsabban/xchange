import { Component, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpService } from 'src/app/utilities/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private http:HttpService) {}
    payload:any;
    amountsList:number[] = [1,5,10,20,30]
    fromRate:number = 0;
    toRate:number = 0;
    setAmountListRates(event:any) {
      this.payload = event
      forkJoin([this.http.getConvertionRate(event.from,event.to),this.http.getConvertionRate(event.to,event.from)]).subscribe(
        (res:any) => {
          console.log(res)
           this.fromRate = res[0].conversion_rate;
           this.toRate = res[1].conversion_rate;
        }
      ) 
      
    }
    
}
