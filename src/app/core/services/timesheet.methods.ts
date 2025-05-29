import { Observable } from "rxjs";
import { ITimesheetRequest } from "../interfaces/timesheet-request.interface";
import { ITimesheetResponse } from "../interfaces/timesheet-response.interface";

export abstract class TimeSheetMethods {
  abstract getSchedule(request: ITimesheetRequest): Observable<ITimesheetResponse>;
}