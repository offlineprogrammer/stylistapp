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

  generateStyle: a
    .query()
    .arguments({ prompt: a.string().required() })
    .returns(a.ref("BedrockResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({ entry: "./generateStyle.js", dataSource: "bedrockDS" })
    ),


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