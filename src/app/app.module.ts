import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from '../modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      User
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include : [UserModule],
      autoSchemaFile: true,//'schema.gql'
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath: '.env',
      //load: [DatabaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      useFactory : (configService: ConfigService) =>({
       type: "mysql",
       host : configService.get<string>('DB_HOST'),
       port : +configService.get<string>('DB_PORT'),
       username: configService.get<string>('DB_USERNAME'),
       password : configService.get<string>('DB_PASSWORD'),
       database: configService.get<string>('DB_DATABASE'),
       maxQueryExecutionTime: 1000,
       synchronize: true,
       autoLoadEntities: true,
       entities: [join(__dirname, './../**/**.entity{.ts,.js}')],
       //subscribers: [join(__dirname, './../**/**.subscriber{.ts,.js}')],
       migrations: [join(__dirname, './../../migrations/{.ts,*.js}')],
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) =>{
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
