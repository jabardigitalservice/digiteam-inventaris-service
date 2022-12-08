import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthUser } from 'src/common/interfaces/keycloak-user.interface';
import { KeycloakRolesService } from 'src/providers/sso/keycloak/roles.provider';
import { AuthenticationsService } from './authentications.service';

const mockUserAccess = {
  name: 'test',
  email: 'test',
  role: ['test'],
  isAdmin: true,
};

const mockAuthUser: AuthUser = {
  realm_access: {
    roles: ['test'],
  },
  name: 'test',
  email: 'test',
};

const mockResult = {
  data: {
    name: mockUserAccess.name,
    email: mockUserAccess.email,
    isAdmin: mockUserAccess.isAdmin,
  },
};

describe('AuthenticationsService', () => {
  let rolesService: KeycloakRolesService;
  let service: AuthenticationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, AuthenticationsService, KeycloakRolesService],
    }).compile();

    rolesService = module.get<KeycloakRolesService>(KeycloakRolesService);
    service = module.get<AuthenticationsService>(AuthenticationsService);
  });

  describe('findById', () => {
    it('should return user profile', async () => {
      jest
        .spyOn(rolesService, 'getUserAccess')
        .mockReturnValueOnce(mockUserAccess);

      expect(service.getProfile(mockAuthUser)).toEqual(mockResult);

      expect(rolesService.getUserAccess).toHaveBeenCalled();

      expect(rolesService.getUserAccess).toHaveBeenCalledWith(mockAuthUser);
    });
  });
});
