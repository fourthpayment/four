"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ip = require("ip");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const application_module_1 = require("./application.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = 3000;
        const host = ip.address();
        const address = `http://${host}:${port}`;
        const application = yield core_1.NestFactory.create(application_module_1.ApplicationModule, {
            bodyParser: true,
            cors: true,
        });
        application.useGlobalPipes(new common_1.ValidationPipe());
        const logger = new common_1.Logger("FourthPayment", true);
        const callback = () => {
            logger.log(`Server on: ${address}`);
        };
        yield application.listen(port, callback);
    });
}
bootstrap();
