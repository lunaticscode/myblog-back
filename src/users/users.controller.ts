import { Controller, Get, Req, Post, Body, Res, Param, UseGuards,  } from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('/user')
export class UsersController {
  constructor(
      private readonly usersService: UsersService, 
    ) {}
  
  @Post('/login')
  async findAmdin( @Req() req: Request, @Res() res: Response ): Promise<User | undefined> {
    const id = req.body.id;
    const pw = req.body.pw;
    console.log(req.body);
    const result = await this.usersService.findAdmin(id, pw);
    console.log(result);
    if( result )
    res.json({ res: 2000 })
   return result;
  }

  @Get('/list')
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

}


