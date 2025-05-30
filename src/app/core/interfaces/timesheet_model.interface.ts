export interface IStudentTimeSheet {
  student: IStudent
  schedule: IClass[];
}

export interface IClass {
  class: string;
  day: string;
  start: string;
  end: string;
}

export interface IStudent {
  studentName: string;
  studentId: string;
}