import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { MODEL_ID, data } from './data/resource';

import {  PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stack } from 'aws-cdk-lib';


export const backend = defineBackend({
  auth,
  data,

});



const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  `https://bedrock-runtime.${Stack.of(backend.data).region}.amazonaws.com`,
  {
    authorizationConfig: {
      signingRegion: Stack.of(backend.data).region,
      signingServiceName: "bedrock",
    },
  }
);

bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [

      `arn:aws:bedrock:${Stack.of(backend.data).region}::foundation-model/${MODEL_ID}`,
    ],
    actions: ["bedrock:InvokeModel"],
    
  })
);

