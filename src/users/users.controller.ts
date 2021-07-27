import { Controller, Get, Req, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { API_RESULT } from '../_common';

const IS_DEBUG = (process.env.MODE === 'LOCAL');
@Controller('/user')
export class UsersController {
  constructor(
      private readonly usersService: UsersService, 
      //private session : Session,
  ) {}

  @Post('/login')
  async loginAdmin( @Req() req: Request, @Res() res: Response ) {

    const id = req.body.id;
    const pw = req.body.pw;
    if( !id || !pw || typeof id !== 'string' || typeof pw !== 'string' || !id.trim().length || !pw.trim().length ){
      res.json({ res: 50000, msg: 'Invalid id or password' })
    }
    IS_DEBUG && console.log(req.body);
    const result = await this.usersService.loginAdmin(id, pw);
    console.log('usersService.loginAdmin ::: return => ', result);
    if( result['res'] === API_RESULT.SUCCESS ){
      req.session['tokenId'] = result['tokenId'];
      req.session.save((err) => {
        if( err ) {
          console.log(err);
        }
        IS_DEBUG && console.log(' req.session => ', req.session);
        res.cookie('tokenId', result['tokenId'], {maxAge: 10000000, expires: new Date( Date.now() + (3600 * 18 * 1000) )})
        res.status(200).json(result);
      })
    }else{
      
    }
    
  }

  @Get('/list')
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

}


