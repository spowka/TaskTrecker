import { IFullName } from '../common/interfaces/fullName.interface';

export class StudentListModel implements IFullName {

  constructor(
    public id: string,
    public image: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public level: string,
    // public gender: string,
    public phone: string,
    public email: string,
    public points: number
  ) {
  }
}
