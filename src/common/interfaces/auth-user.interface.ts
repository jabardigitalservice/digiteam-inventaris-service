export interface AuthUser {
  realm_access: RealmAccess;
  resource_access: ResourceAccess;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface RealmAccess {
  roles: string[];
}

export interface ResourceAccess {
  'digiteam-inventaris-app': RealmAccess;
  account: RealmAccess;
  client: RealmAccess;
}

export interface UserAccess {
  name: string;
  email: string;
  role: string[];
  isAdmin: boolean;
}

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
