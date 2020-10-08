import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  async getGeoIp(ip: string) {
    return await this.http
      .get<{
        ip: string;
        version: string;
        city: string;
        region: string;
        region_code: string;
        country: string;
        country_name: string;
        country_code: string;
        country_code_iso3: string;
        country_capital: string;
        country_tld: string;
        continent_code: string;
        in_eu: boolean;
        postal: string;
        latitude: number;
        longitude: number;
        timezone: string;
        utc_offset: string;
        country_calling_code: string;
        currency: string;
        currency_name: string;
        languages: string;
        country_area: number;
        country_population: number;
        asn: string;
        org: string;
      }>(`https://ipapi.co/${ip}/json/`)
      .pipe(map(res => res.data))
      .toPromise();
  }
}
