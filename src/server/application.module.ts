import { Module } from "@nestjs/common";
import { CoreModule } from "@fourthpayment/core/modules/core.module";
import { GraphqlModule } from "@fourthpayment/graphql/modules/graphql.module";
import { RestfulModule } from "@fourthpayment/restful/modules/restful.module";

@Module({
    imports: [
        CoreModule,
        GraphqlModule,
        RestfulModule,
    ],
})
export class ApplicationModule {
}
