import { IFullName } from '../common/interfaces/fullName.interface';

export class EmployeeListModel implements IFullName {
  id: string;
  image: string;
  firstName: string;
  middleName: string;
  lastName: string;
  level: string;
  phone: string;
  email: string;
}
