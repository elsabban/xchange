import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import currencies from 'src/app/utilities/currencies';
import { HttpService } from 'src/app/utilities/services/http.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() isDetails:boolean = false;
  @Input() selectedCurrencies:any;
  @Output() convertedCurrencies:EventEmitter<any> = new EventEmitter()
  constructor(private http:HttpService){}
  currencies:any = currencies.allCurrencies;
  converterForm!:FormGroup;
  data:any;
  result:number = 0
  options:any [] = currencies.currenciesShortArr
  ngOnInit(): void {
     this.converterForm = new FormGroup({
      amount:new FormControl(1,Validators.required),
      from:new FormControl('USD',[Validators.required]),
      to:new FormControl('EGP',[Validators.required])
    })
    // check if inside details component
    if(this.isDetails) {
      this.converterForm.controls['from'].setValue(this.selectedCurrencies.from)
      this.converterForm.controls['to'].setValue(this.selectedCurrencies.to)
    }
    this.convert(this.converterForm) 
  }
  
  
  convert(form:FormGroup) {
    // set validation if amount field is < 0
    if(form.value.amount <= 0) {
      this.converterForm.controls['amount'].setErrors({'minValue':true})
      this.result = 0
      return
    }else {
      this.converterForm.controls['amount'].setErrors({'minValue':null})
    }
    this.http.convert(form.value).subscribe(
      (res:any) => {
        this.data = res
        this.result = this.data.conversion_result
        this.convertedCurrencies.emit({
          conversion_rate:this.data.conversion_rate,
          from:this.converterForm.value.from,
          to:this.converterForm.value.to
        })
      }
    )
  }
  // switch currencies 
  switch() {
      let from = this.converterForm.value.from,
          to = this.converterForm.value.to;
      this.converterForm.controls['from'].setValue(to);
      this.converterForm.controls['to'].setValue(from);
   
      this.convert(this.converterForm)

  }

} 
