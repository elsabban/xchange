import { Component, OnInit } from '@angular/core';
import { HttpService } from './utilities/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http:HttpService) {}
  ngOnInit(): void {
 
    
  }
  title = 'xchange';
}
