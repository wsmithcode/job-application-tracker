import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from "./modules/auth/strategy/jwt.strategy";
import { JobResearchModule} from "@modules/job-research/job-research.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JobResearchModule
  ],
  controllers: [AppController],
  providers: [AppService,
      JwtStrategy
  ],
})
export class AppModule {}
