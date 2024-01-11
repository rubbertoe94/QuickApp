import { Component } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel } from 'src/app/models/pickleball.models';
import { CourtService } from 'src/app/services/court.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-courts-form',
  templateUrl: './courts-form.component.html',
  styleUrls: ['./courts-form.component.scss']
})
export class CourtsFormComponent {
court: CourtViewModel;
courtId: number;
locations: LocationViewModel[];
existingCourts: CourtViewModel[];

constructor(private router: Router, private route: ActivatedRoute, private courtService: CourtService, private locationService: LocationService) {}

ngOnInit() {
this.getLocations();
this.court = new CourtViewModel();
}

addCourt() {
  this.courtService.getCourts().subscribe(data => {
    this.existingCourts = data;

    const courtNumberExists = this.existingCourts.some(
      existingCourt => existingCourt.courtNumber === this.court.courtNumber && existingCourt.locationId === this.court.locationId
    );

    if (courtNumberExists) {
      window.alert('Court number already exists at this location. Please choose a different number.');
    } else {
      this.courtService.addCourt(this.court).subscribe(
        () => {
          window.alert('Court added successfully');
          this.router.navigate(['/courts-list']);
        },
        (error) => {
          if (error.error && error.error.Message) {
            window.alert(error.error.Message);
          } else {
            window.alert('Court number already exists at this location. Please choose a different number.');
          }
        }
      );
    }
  });
}
// addCourt() {
//   this.courtService.getCourts().subscribe(data => {
//     this.existingCourts = data;

//     const courtNumberExists = this.existingCourts.some(
//       existingCourt => existingCourt.courtNumber === this.court.courtNumber &&
//                         existingCourt.locationId === this.court.locationId
//       );

//     if (courtNumberExists) {
//       window.alert('Court number already exists. Please choose a new one.');
//     } else {
//       this.courtService.addCourt(this.court).subscribe(() => {
//         window.alert('Court added successfully');
//         this.router.navigate(['/courts-list']);
//       });
//     }
//   });
// }

getLocations() {
  this.locationService.getLocations().subscribe(result =>
    {this.locations = result})
}

}
