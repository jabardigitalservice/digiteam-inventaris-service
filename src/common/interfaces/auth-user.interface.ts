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
