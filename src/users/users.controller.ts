import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

import { IUserRequest, User } from './user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: IUserRequest) {
    const user = await this.service.findOne(req.user.id);
    const isValid = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
    if (!isValid) throw new UnauthorizedException('Password is wrong!');
    const hashPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    user.password = hashPassword;
    return await this.service.save(user);
  }
}
