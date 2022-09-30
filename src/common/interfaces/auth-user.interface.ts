export interface AuthUser {
  realm_access: RealmAccess;
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
