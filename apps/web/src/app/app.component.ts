import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'petstat-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('/api/team').subscribe(data => {
      console.log(data)
    })
  }
}
