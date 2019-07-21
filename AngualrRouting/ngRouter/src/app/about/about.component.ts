import { Component, OnInit } from '@angular/core';
import { products } from './products';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public gridData: any[] = products;
  constructor() { }

  ngOnInit() {
  }

}
