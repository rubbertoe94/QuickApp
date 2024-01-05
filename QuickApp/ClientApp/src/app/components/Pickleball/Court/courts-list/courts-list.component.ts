import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel } from 'src/app/models/pickleball.models';
import { CourtService } from 'src/app/services/court.service';

@Component({
  selector: 'app-courts-list',
  templateUrl: './courts-list.component.html',
  styleUrls: ['./courts-list.component.scss']
})
export class CourtsListComponent {
courts: CourtViewModel[];

constructor(private courtService: CourtService) {}

ngOnInit() {
  this.loadCourts();
}

loadCourts() {
  this.courtService.getCourts().subscribe(result => {
    this.courts = result;
    }
  )
}

}
