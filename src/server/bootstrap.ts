import * as ip from "ip";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./application.module";

async function bootstrap() {
    const port = 3000;
    const host = ip.address();
    const address = `http://${host}:${port}`;
    const application = await NestFactory.create(ApplicationModule, {
        bodyParser: true,
        cors: true,
    });
    application.useGlobalPipes(new ValidationPipe());
    const logger = new Logger("FourthPayment", true);
    const callback = () => {
        logger.log(`Server on: ${address}`);
    };
    await application.listen(port, callback);
}

bootstrap();
