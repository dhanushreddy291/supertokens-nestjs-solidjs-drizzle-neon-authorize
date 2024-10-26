import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as SuperTokensConfig from './config';

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: SuperTokensConfig.connectionUri,
      apiKey: process.env.SUPERTOKENS_API_KEY,
      appInfo: SuperTokensConfig.appInfo,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
