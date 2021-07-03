import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report2';
  sourceList: Satellite[];
  displayList: Satellite[];

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }

  constructor() {
   this.sourceList = [];
   this.displayList = []
   let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

   window.fetch(satellitesUrl).then((response: any) => {
      response.json().then((data: any) => {

         let fetchedSatellites = data.satellites;
         // TODO: loop over satellites
         for (let i = 0; i < fetchedSatellites.length; i++) {
           let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
           this.sourceList.push(satellite)
           // make a copy of the sourceList to be shown to the user
      this.displayList = this.sourceList.slice(0);
    };
 });
         }
         // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
         // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);

   )}}
