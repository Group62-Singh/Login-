import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { USER_REPOSITORY } from './user.providers';
import { PROFILE_REPOSITORY } from 'src/profiles/profile.providers';
import { Profile } from 'src/profiles/profile.entity';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(PROFILE_REPOSITORY)
    private profileRepository: Repository<Profile>,
  ) {}

  async addUser(user: any) {
    const existingUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (existingUser) {
      throw new ConflictException('username already exists');
    }
    const _user = this.userRepository.create();
    _user.username = user.username;
    _user.password = bcrypt.hashSync(user.password, 10);
    const profile = this.profileRepository.create();
    _user.profile = await this.profileRepository.save(profile);
    this.userRepository.save(_user);
  }

  async setProfile(user: any, payload: UpdateProfileDto) {
    const _user = await this.userRepository.findOne({
      where: { username: user.username },
      relations: ['profile'],
    });

    const _profile = await this.profileRepository.update(
      { id: _user.profile.id },
      payload,
    );

    // const _updatedUser = await this.userRepository.update(
    //   { username: user.username },
    //   { firstLogin: false },
    // );

    // if (_profile.affected === 0 || _updatedUser.affected === 0) {
    if (_profile.affected === 0) {
      throw new BadRequestException();
    }
  }

  async getProfile(user: any) {
    const { profile } = await this.userRepository.findOne({
      where: { username: user.username },
      relations: ['profile'],
    });
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
