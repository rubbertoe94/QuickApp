import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel } from 'src/app/models/pickleball.models';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
  locations: LocationViewModel[];
  courts: CourtViewModel[];
  
  constructor(private locationService: LocationService) {}
  
  ngOnInit() {
    this.loadLocations();
  }
  
  loadLocations() {
    this.locationService.getLocations().subscribe(result => {
      this.locations = result;
      this.courts = result.courts;
      }
    )
  }
  
  }
