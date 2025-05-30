import { Observable } from "rxjs";
import { ITimesheetRequest } from "../../core/interfaces/timesheet-request.interface";
import { ITimesheetResponse } from "../../core/interfaces/timesheet-response.interface";

export abstract class TimeSheetMethods {
  abstract getSchedule(request: ITimesheetRequest): Observable<ITimesheetResponse>;
}