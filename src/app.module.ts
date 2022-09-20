import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { SamplesModule } from './models/samples/samples.module';

@Module({
  imports: [AuthenticationModule, SamplesModule],
})
export class AppModule {}
