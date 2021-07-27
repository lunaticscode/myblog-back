import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;
async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.use( 
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 3600,
          path: '/'
        }
    })
  )
  
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  

}
bootstrap();
