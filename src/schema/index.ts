import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./User";
import { BuffViewersLivestreamResolver  } from "./Services/BuffViewersLivestream";
import { FacebookAccountResolver } from "./FacebookAccount";
import { VIPViewersLivestreamResolver } from "./Services/VIPViewersLivestream";
import { LivestreamResolver } from "./Services/Livestream";
import { PaymentHistoryResolver } from "./PaymentHistory";
import { BuffViewersVideoResolver } from "./Services/BuffViewersVideo/BuffViewersVideoResolver";




async function bootstrap() {

  await buildSchema({
    resolvers: [
      UserResolver,
      BuffViewersLivestreamResolver,
      VIPViewersLivestreamResolver,
      BuffViewersVideoResolver,
      LivestreamResolver,
      FacebookAccountResolver,
      PaymentHistoryResolver
    ],
    emitSchemaFile: './src/schema/schema.graphql',

  });

}

bootstrap();
