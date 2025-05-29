import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ITimesheetResponse } from '../interfaces/timesheet-response.interface';
import { ITimesheetRequest } from '../interfaces/timesheet-request.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentScheduleService {

  constructor(private http:HttpService) { }

    getStudentSchedule(request: ITimesheetRequest): Observable<ITimesheetResponse> {
    return this.http.getSchedule(request);
  }
}
