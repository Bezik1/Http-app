import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config: Config | undefined
  headers: string[] | undefined

  constructor(private configService: ConfigService) { }

  showConfig() {
    this.configService.getConfig()
      .subscribe(data => this.config = {
          heroesUrl: data.heroesUrl,
          textfile:  data.textfile,
          date: data.date,
      });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }

  ngOnInit(): void {
  }

}
