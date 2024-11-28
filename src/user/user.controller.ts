import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { Public } from '~/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  async getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getByEmail(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
