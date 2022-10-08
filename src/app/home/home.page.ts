import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public longitude : string = ''
  public latitude  : string = ''
  public dataLocation : string
  public timeseries : object
  public timeApi : string

  public air_pressure_at_sea_level : number
  public air_temperature : number
  public cloud_area_fraction : number
  public relative_humidity : number
  public wind_from_direction : number
  public wind_speed : number

  public ishidden = true;
  constructor(private http:HttpClient) {}

  async getLocation() {

    this.http.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${this.latitude}&lon=${this.longitude}`)
      .subscribe((tempo: any) => {
        this.timeApi = tempo.properties.timeseries.time
        this.air_pressure_at_sea_level = tempo.properties.timeseries[0].data.instant.details.air_pressure_at_sea_level
        this.air_temperature = tempo.properties.timeseries[0].data.instant.details.air_temperature
        this.cloud_area_fraction = tempo.properties.timeseries[0].data.instant.details.cloud_area_fraction
        this.relative_humidity = tempo.properties.timeseries[0].data.instant.details.relative_humidity
        this.wind_from_direction = tempo.properties.timeseries[0].data.instant.details.wind_from_direction
        this.wind_speed = tempo.properties.timeseries[0].data.instant.details.wind_speed
        this.ishidden = false
      })
  }
}