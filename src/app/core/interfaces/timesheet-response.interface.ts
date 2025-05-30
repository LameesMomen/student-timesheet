import { IStudentTimeSheet } from "./timesheet_model.interface";

export interface ITimesheetResponse {
  success: boolean;
  data?: IStudentTimeSheet;
  error?: string;
}