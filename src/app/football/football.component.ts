import { Standing } from './../model/standing';
import { Team } from './../model/team';
import { League } from './../model/league';
import { FootballService } from './../football.service';
import { Component, OnInit } from '@angular/core';
import { Country } from '../model/country';

// interface Country {
//   name: string;
//   flag: string;
//   area: number;
//   population: number;
// }

// const COUNTRIES: Country[] = [
//   {
//     name: 'Russia',
//     flag: 'f/f3/Flag_of_Russia.svg',
//     area: 17075200,
//     population: 146989754
//   },
//   {
//     name: 'Canada',
//     flag: 'c/cf/Flag_of_Canada.svg',
//     area: 9976140,
//     population: 36624199
//   },
//   {
//     name: 'United States',
//     flag: 'a/a4/Flag_of_the_United_States.svg',
//     area: 9629091,
//     population: 324459463
//   },
//   {
//     name: 'China',
//     flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
//     area: 9596960,
//     population: 1409517397
//   }
// ];

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss']
})
export class FootballComponent implements OnInit {

  constructor(private footballService: FootballService) { }

  countries: Country[];
  selectedCountry:number;
  leagues:League[];
  selectedLeague:number;
  teams: Team[];
  selectedTeam: number;
  standings:Standing[];


  ngOnInit(): void {
    this.footballService.getCountry().subscribe(
      response=> { 
      this.countries= response;
      console.log("country: "+ JSON.stringify(response));

      }
    );
  }
  onCountrySelected(){
    console.log("selected country: "+ this.selectedCountry);
    this.footballService.getLeague(this.selectedCountry).subscribe(
      response=>{
        this.leagues=response;
        console.log("leagues: "+ JSON.stringify(response));
      }
    );

  }
  onLeagueSelected(){
    console.log("selected league: "+ this.selectedLeague);
    this.footballService.getTeam(this.selectedLeague).subscribe(
      response=>{
        this.teams=response;
        console.log("team: "+ JSON.stringify(response));
      }
    );
  }
  onTeamSelected(){
    console.log("selected team: "+ this.selectedTeam);
    let country_name=this.countries.find(c=>c.country_id=this.selectedCountry).country_name;
    this.footballService.getStanding(this.selectedLeague,this.selectedTeam,country_name).subscribe(
      response=>{
        this.standings=response;
        console.log("standing: "+ JSON.stringify(response));
      }
    )
  }
  

}
