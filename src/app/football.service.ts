import { Standing } from './model/standing';
import { Team } from './model/team';
import { League } from './model/league';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from './model/country';


@Injectable({
  providedIn: 'root'
})
export class FootballService {

  constructor(private http: HttpClient) { }

  private apiUrl='http://localhost:8085/fifa';
  

  getCountry(){
      return this.http.get<Country[]>(this.apiUrl+'/countries');
  }

  getLeague(countryId:number){
    return this.http.get<League[]>(this.apiUrl+'/country/'+countryId+'/leagues');
  }

  getTeam(leagueId:number){
    return this.http.get<Team[]>(this.apiUrl+'/league/'+leagueId+'/teams');
  }

  getStanding(leagueId:number,teamId:number,countryName){
    return this.http.get<Standing[]>(this.apiUrl+'/standings/'+leagueId+'/?team_id='+teamId+'&country_name='+countryName);
  }

}
