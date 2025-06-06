import { Injectable } from '@angular/core';
import { delay, filter, find, map, Observable, of } from 'rxjs';
import { TimeSheetMethods } from '../../shared/utils/timesheet.methods';
import { generateSessionId } from '../../shared/utils/generate_session_Id';
import { ITimesheetRequest } from '../interfaces/timesheet-request.interface';
import { ITimesheetResponse } from '../interfaces/timesheet-response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends TimeSheetMethods {
  private readonly mockApiUrl = 'assets/mock/timesheet-mock.json';

  constructor(private http: HttpClient) {
    super();
  }

  override getSchedule(
    request: ITimesheetRequest
  ): Observable<ITimesheetResponse> {
    const sessionId = generateSessionId(request.studentId);
    const headers = new HttpHeaders({
      sessionID: sessionId,
    });

    return this.http.post<ITimesheetResponse>(this.mockApiUrl,request, { headers }).pipe(
      map((response) => {
        const student = response.data?.filter(
          (el) => el.student.studentId == request.studentId
        );

        if (!student?.length) {
          throw new Error('Student ID not found');
        }

        return { ...response, data: student };
      })
    );
  }
}
