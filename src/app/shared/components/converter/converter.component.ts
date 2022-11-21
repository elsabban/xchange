import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/utilities/services/http.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() isDetails:boolean = false;
  @Output() getRate:EventEmitter<any> = new EventEmitter()
  constructor(private http:HttpService){}
  converterForm!:FormGroup;
  conversionRate!:number;
  data:any;
  result:number = 0
  options:any [] = [ "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", 
  "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD",
   "BTC", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNH", "CNY",
    "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN",
     "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ",
      "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR",
       "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", 
       "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
        "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", 
        "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR",
         "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS",
          "SRD", "SSP", "STD", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
           "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VES", "VND", "VUV", "WST",
            "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "YER", "ZAR", "ZMW", "ZWL" ]
  ngOnInit(): void {
     this.converterForm = new FormGroup({
      amount:new FormControl(0,Validators.required),
      from:new FormControl('USD',[Validators.required]),
      to:new FormControl('EGP',[Validators.required])
    })
 
  }
  
  
  convert(form:FormGroup) {
    this.http.convert(form.value).subscribe(
      (res:any) => {
        this.data = res
        this.result = this.data.conversion_result
        this.getRate.emit({
          from:this.converterForm.value.from,
          to:this.converterForm.value.to
        })
      }
    )
  }

  switch() {
      let from = this.converterForm.value.from,
          to = this.converterForm.value.to;
      this.converterForm.controls['from'].setValue(to);
      this.converterForm.controls['to'].setValue(from);
   
      this.convert(this.converterForm)

  }

  redirectToDetails() {
    
  }
} 
