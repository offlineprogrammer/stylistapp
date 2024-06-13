import {
  type ClientSchema,
  a,
  defineData,

} from "@aws-amplify/backend";


export const MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0";


const schema = a.schema({

  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

    generateTextFromPrompt: a
    .query()
    .arguments({
      text: a.string().required(),
      sessionId: a.string().required(),
    })
    .returns(a.ref('BedrockKBResponse'))
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: 'BedrockHTTPDS',
        entry: './retrieveAndGenerate.js',
      })
    ),



    BedrockKBResponse: a.customType({
      text: a
        .string()
        .required()
        .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),
      sessionId: a
        .string()
        .required()
        .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),
    }),




});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});