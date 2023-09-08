import { DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export function GraphqlModuleGenerator(): DynamicModule {
  return GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    playground: false,
    autoSchemaFile: path.join(process.cwd(), './src/schema.gql'),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });
}
