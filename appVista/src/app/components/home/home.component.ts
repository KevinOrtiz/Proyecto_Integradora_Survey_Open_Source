import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from "../../route.animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
  

}
