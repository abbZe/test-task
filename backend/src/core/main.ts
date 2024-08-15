import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppModule } from './modules/app.module.js';

class Application {
    private _app: NestExpressApplication | undefined;
    private readonly _appModule: AppModule;
    private readonly _PORT: number;

    constructor(_appModule: AppModule, _PORT: number) {
        this._app = undefined;
        this._appModule = _appModule;
        this._PORT = _PORT;
    }

    public async start(): Promise<NestExpressApplication> {
        await this.initializeApp();
        await this.configureApp();
        await this.configureSwagger();
        await this._app?.listen(this._PORT);
        Logger.log(`️️⚒️ ️[APP] Application is running on: ${await this._app?.getUrl()} ⚒️`);

        return this._app!;
    }

    private async initializeApp(): Promise<NestExpressApplication> {
        /**
         * Инициализация нужна, потому что конструктор
         * не обработает промис, возвращаемый фабрикой
         */
        if (!this._app) {
            this._app = await NestFactory.create<NestExpressApplication>(this._appModule);
        }
        return this._app;
    }

    private async configureApp(): Promise<void> {
        this._app?.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true,
            }),
        );
        this._app?.setGlobalPrefix('v1');
        this._app?.enableCors();
        this._app?.use(helmet());
        this._app?.use(morgan('combined'));
        this._app?.useStaticAssets(
            path.join(path.dirname(fileURLToPath(import.meta.url)), '/..', '/public'),
            {
                prefix: '/public/',
            },
        );
    }

    private async configureSwagger(): Promise<void> {
        const config = new DocumentBuilder()
            .setTitle('test-task')
            .setDescription('test-task api description')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(this._app!, config);
        SwaggerModule.setup('api', this._app!, document);
    }
}

new Application(AppModule, 3000).start();
