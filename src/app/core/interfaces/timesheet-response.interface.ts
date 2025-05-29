import { IStudentTimeSheet } from "../models/timesheet_model";

export interface ITimesheetResponse {
  success: boolean;
  data?: IStudentTimeSheet;
  error?: string;
}