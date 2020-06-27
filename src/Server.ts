import { PlatformApplication, Configuration, Inject } from '@tsed/common';
import { GlobalAcceptMimesMiddleware } from '@tsed/platform-express';
import '@tsed/multipartfiles';
import '@tsed/platform-express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import '@tsed/ajv';
import '@tsed/mongoose';
import * as mongooseConfig from './config/mongoose';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    '/': [`${rootDir}/controllers/**/*.ts`],
  },
  // mongoose: mongooseConfig,
  mongoose: [
    {
      id: 'default',
      url: process.env.MONGOSE_URL || 'mongodb://localhost:27017/dealership',
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  ],
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

    // return null;
  }
}
