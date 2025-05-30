import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
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
      'sessionID': sessionId
    });

    return this.http.get<ITimesheetResponse>(this.mockApiUrl, { headers }).pipe(
      delay(200), 
      map(response => {
        return response;
      })
    );
  }
}
