import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const path = require('path');
export enum NodeEnv {
  Dev = 'dev',
  Uat = 'uat',
  Prod = 'prod',
}

const ENV = process.env.NODE_ENV?.trim() || '';
const envPath = path.join(__dirname, `/../../src/config/env/${ENV}.env`);
console.log('envPath', envPath);
Logger.log(`> set environment file : ${ENV}.env`, 'ConfigService');
if (ENV) {
  require('dotenv').config({
    path: envPath,
  });
} else {
  require('dotenv').config();
}

enum Key {
  URL_API = 'URL_API',
  API_KEY = 'API_KEY',
  HOST_DB = 'HOST_DB',
  PORT_DB = 'PORT_DB',
  USERNAME_DB = 'USERNAME_DB',
  PASSWORD_DB = 'PASSWORD_DB',
  DATABASE = 'DATABASE',
  DB_AUTOLOAD_ENTITIES = 'DB_AUTOLOAD_ENTITIES',
  DB_SYNCHRONIZE = 'DB_SYNCHRONIZE',
}

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public get(key: Key, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
  get typeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.get(Key.HOST_DB, true),
      port: parseInt(this.get(Key.PORT_DB, true)),
      username: this.get(Key.USERNAME_DB, true),
      password: this.get(Key.PASSWORD_DB, true),
      database: this.get(Key.DATABASE, true),
      autoLoadEntities: JSON.parse(this.get(Key.DB_AUTOLOAD_ENTITIES, true)),
      synchronize: JSON.parse(this.get(Key.DB_SYNCHRONIZE, true)),
    };
  }
}

const configService = new ConfigService(process.env);

export { Key, configService };
