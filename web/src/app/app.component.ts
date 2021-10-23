import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(
    private http: HttpClient
  ) { }

  public ngOnInit(): void {
    this.http.get('/api/bot-user').subscribe(data => {
      console.log(data);
    });
  }
}
