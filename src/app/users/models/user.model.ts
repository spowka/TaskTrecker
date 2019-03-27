export interface User {
  email: string;
  entity: {
    firstName: string,
    lastName: string,
    image: string,
    studentProfile: {
      level: number
    },
    employeeProfile: {
      position: number
    }
  };
  isAdmin: boolean;
  isInactive: boolean;
}
