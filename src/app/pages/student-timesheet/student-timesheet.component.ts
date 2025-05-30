import { Component } from '@angular/core';
import { IStudentTimeSheet } from '../../core/interfaces/timesheet_model.interface';
import { StudentScheduleService } from '../../core/services/student-schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITimesheetResponse } from '../../core/interfaces/timesheet-response.interface';

@Component({
  selector: 'app-student-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-timesheet.component.html',
  styleUrl: './student-timesheet.component.scss',
})
export class StudentTimesheetComponent {
  studentId: string = '';
  errorMessage?: string;
  response?: ITimesheetResponse | null;
  schedule?: IStudentTimeSheet;
  currentClassIndex: number | null = null;
  nextClassIndex: number | null = null;

  constructor(private scheduleService: StudentScheduleService) {}

  getSchedule() {
    this.scheduleService
      .getStudentSchedule({ studentId: this.studentId })
      .subscribe(
        (res) => {
          this.response = res;
          this.schedule = this.response.data?.find(
            (el) => el.student.studentId == this.studentId
          );
          this.highlightCurrentClass();
        },
        (err) => {
          this.response = null;
          this.errorMessage = err;
        }
      );
  }

  highlightCurrentClass() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() + now.getMinutes() / 60;

    const todayClasses = this.schedule?.schedule
      .map((cls, index) => ({ ...cls, index }))
      .filter((c) => c.day === currentDay);

    let current = null;
    let next = null;

    if (todayClasses && todayClasses.length) {
      for (let i = 0; i < todayClasses.length; i++) {
        const start = this.timeToHour(todayClasses[i].start);
        const end = this.timeToHour(todayClasses[i].end);
        if (currentTime >= start && currentTime <= end) {
          current = todayClasses[i];
          break;
        } else if (currentTime < start && !next) {
          next = todayClasses[i];
        }
      }
    }

    this.currentClassIndex = current?.index ?? null;
    this.nextClassIndex = !current ? next?.index ?? null : null;
  }

  timeToHour(time: string): number {
    const [hour, min] = time.split(':').map(Number);
    return hour + min / 60;
  }
}
