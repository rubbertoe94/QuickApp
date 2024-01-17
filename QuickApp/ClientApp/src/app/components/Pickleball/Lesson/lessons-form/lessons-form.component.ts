import { Component } from '@angular/core';
import { CourtViewModel, LessonViewModel, LessonViewModelAddOrEdit, LocationViewModel, UserViewModel } from 'src/app/models/pickleball.models';
import { LessonService } from 'src/app/services/lesson.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CourtService } from 'src/app/services/court.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.scss']
})
export class LessonsFormComponent {
lesson: LessonViewModelAddOrEdit;
locations: LocationViewModel[];
courts: CourtViewModel[];
users: UserViewModel[];
selectedLocationId: number;


constructor(
  private lessonService: LessonService,
  private route: ActivatedRoute,
  private router: Router,
  private locationService: LocationService,
  private userService: UserService,
  private courtService: CourtService){}

ngOnInit() {
  this.lesson = new LessonViewModel();
  this.loadLocations();
  this.loadUsers();
}

onSubmit() {
  this.lessonService.addLesson(this.lesson).subscribe(
    () => {
    window.alert('Lesson added successfully');
    this.router.navigate(['/lessons-list']);
    }
  )
}

loadLocations() {
  this.locationService.getLocations().subscribe(
    (results) => {
      this.locations = results;
    } 
  )
}

loadUsers() {
  this.userService.getUsers().subscribe(
    (results) => {
      this.users = results;
    }
  )
}

onLocationChange() {
  this.courtService.getCourtsByLocationId(this.lesson.locationId).subscribe(
    (result) => {
    this.courts = result;
  });
}



}