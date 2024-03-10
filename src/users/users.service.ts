import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const allUsers = this.userModel.find({});
    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const userById = this.userModel.findById(id);
    return userById;
  }
}
