import { Component } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel, AddLocationViewModel } from 'src/app/models/pickleball.models';
import { CourtService } from 'src/app/services/court.service';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent {
  location: AddLocationViewModel;

  
  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService) {}
  
  ngOnInit() {
  this.location = new AddLocationViewModel();
  }
  
  addLocation() {
    this.locationService.addLocation(this.location).subscribe(data => {
      window.alert("Location added successfully");
      this.router.navigate(['/location-list']);
    });
  }
  
 
}
