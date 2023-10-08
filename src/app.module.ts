import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import * as express from 'express';
import { Express } from 'express'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: any) {
    const app: Express = consumer.getHttpAdapter().getInstance();

    // Enable CORS with the desired options
    app.use(
      express.json(), // Optional: Enable JSON parsing middleware
      express.urlencoded({ extended: true }), // Optional: Enable URL-encoded body parsing middleware
    );
    app.use((req, res, next) => {
      const allowedOrigins = ['https://shopxpress-advanced-filter.vercel.app']; // List of allowed origins

      if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin); // Set the allowed origin dynamically
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept',
        );
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      }

      next();
    });
  }
}
