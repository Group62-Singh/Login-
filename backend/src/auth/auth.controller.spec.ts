import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UnauthorizedException } from '@nestjs/common';
import { register } from 'module';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
      imports: [UsersModule, JwtModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('passes with valid credentials', async () => {
    //expect(controller).toBeDefined();
    jest
      .spyOn(service, 'signIn')
      .mockReturnValue(Promise.resolve({ access_token: 'asdasdad' }));
    const request: { username: string; password: string } = {
      username: 'alice',
      password: '123',
    };
    const response = await controller.signIn(request);
    expect(response.access_token).toEqual('asdasdad');
  });

  it('fails with invalid credentials', async () => {
    //expect(controller).toBeDefined();
    jest
      .spyOn(service, 'signIn')
      .mockRejectedValue(new UnauthorizedException());
    const request: { username: string; password: string } = {
      username: 'alice',
      password: '123',
    };
    //const response = await controller.signIn(request);
    expect(() => controller.signIn(request)).rejects.toThrow(
      new UnauthorizedException(),
    );
  });
});
