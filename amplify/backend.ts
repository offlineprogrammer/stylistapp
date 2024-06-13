import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

import {  PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Stack } from 'aws-cdk-lib';
import { storage } from './storage/resource';


export const backend = defineBackend({
  auth,
  data,
  storage,
});

const fileDirectoryName = 'products'
const fileName = 'products_catalog.csv'

const AWS_REGION = Stack.of(backend.data).region

backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
  bucketUri: `s3://${backend.storage.resources.bucket.bucketName}/${fileDirectoryName}/${fileName}`,
  bedrockArn: `arn:aws:bedrock:${AWS_REGION}::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0`,
}

backend.addOutput({
  custom: { fileName },
})

const bedrockKBDatasource = backend.data.addHttpDataSource(
  'BedrockHTTPDS',
  `https://bedrock-agent-runtime.${AWS_REGION}.amazonaws.com`,
  {
    authorizationConfig: {
      signingRegion: AWS_REGION,
      signingServiceName: 'bedrock',
    },
  }
)

bedrockKBDatasource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: ['*'],
    actions: ['bedrock:RetrieveAndGenerate'],
  })
)

bedrockKBDatasource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [`${backend.storage.resources.bucket.bucketArn}/*`],
    actions: ['s3:getObject'],
  })
)

bedrockKBDatasource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [`arn:aws:bedrock:${AWS_REGION}::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0`],
    actions: ['bedrock:InvokeModel'],
  })
)

bedrockKBDatasource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [`arn:aws:bedrock:us-east-1:279012124572:knowledge-base/SKOBM6FMJ7`],
    actions: ['bedrock:Retrieve'],
  })
)


