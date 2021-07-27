import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { MyauthService } from './myauth.service'
@Controller('/auth')
export class MyauthController {

    constructor(
        private myauthService : MyauthService,
    ){}

    @Get('/token')
    async validateToken( @Req() req: Request, @Res() res: Response ){ 
        const token = req.headers.authorization;
        const result = await this.myauthService.validateAdminToken(token);
        res.status(200).json(result);
    }

}
