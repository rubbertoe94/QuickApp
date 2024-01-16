import { Component } from '@angular/core';
import { LessonViewModel } from 'src/app/models/pickleball.models';
import { LessonService } from 'src/app/services/lesson.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lessons-form',
  templateUrl: './lessons-form.component.html',
  styleUrls: ['./lessons-form.component.scss']
})
export class LessonsFormComponent {
lesson: LessonViewModel;

constructor(private lessonService: LessonService, private route: ActivatedRoute, private router: Router){}

ngOnInit() {
  this.lesson = new LessonViewModel();
}

onSubmit() {
  this.lessonService.addLesson(this.lesson).subscribe(
    () => {
    window.alert('Lesson added successfully');
    this.router.navigate(['/lessons-list']);
    }
  )
}

}