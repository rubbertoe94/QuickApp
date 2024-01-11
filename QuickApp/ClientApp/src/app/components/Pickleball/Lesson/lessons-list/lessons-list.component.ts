import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourtViewModel, UserViewModel, LocationViewModel, LessonViewModel } from 'src/app/models/pickleball.models';
import { UserService } from 'src/app/services/user.service';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent {
  lessons: LessonViewModel[];
  users: UserViewModel[];

  
  constructor(private userService: UserService, private lessonService: LessonService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.loadLessons();
    this.loadUsers();
  }
  
  loadLessons() {
    this.lessonService.getLessons().subscribe(
      result => {
      this.lessons = result;
      }
    )
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      result => {
        this.users = result;
      }
    )
  }
  
  }
