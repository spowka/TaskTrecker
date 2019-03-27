import { User } from './user.model';
import { UserListModel } from './user-list.model';

export const userCast = {
  userToUserListModel (user: User): UserListModel {
    return {
      id: '',
      image: user.entity ? user.entity.image : '',
      firstName: user.entity ? user.entity.firstName : '',
      lastName: user.entity ? user.entity.lastName : '',
      email: user.email,
      isAdmin: user.isAdmin,
      isStudent: user.entity ? user.entity.studentProfile != null : false,
      isEmployee: user.entity ? user.entity.employeeProfile != null : false
    };
  }
};
