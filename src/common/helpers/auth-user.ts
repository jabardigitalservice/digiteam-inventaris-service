import { AuthUser, UserAccess } from '../interfaces/auth-user.interface';

export const getUserAccess = (authUser: AuthUser): UserAccess => {
  const role = authUser.resource_access['digiteam-inventaris-app'].roles.map(
    (role) => role,
  );

  const isAdmin =
    authUser.resource_access['digiteam-inventaris-app'].roles.includes('admin');

  return {
    name: authUser.name,
    email: authUser.email,
    role: role,
    isAdmin: isAdmin,
  };
};
