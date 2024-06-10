export function request(ctx) {

    console.log(ctx);
   
     const  prompt  = ctx.args; //`Suggest a style for a casual outfit today`;

     const system =
    "You are a fashion stylist and you are helping a client choose a style ";

   
     return {
       resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
       method: "POST",
       params: {
         headers: {
           "Content-Type": "application/json",
         },
         body: {
           anthropic_version: "bedrock-2023-05-31",
           max_tokens: 1000,
           system,
           messages: [
             {
               role: "user",
               content: [
                 {
                   type: "text",
                   text: `\n\nHuman:${prompt}\n\nAssistant:`,
                 },
               ],
             },
           ],
         },
       },
     };
   }
   
   export function response(ctx) {
     return {
       body: ctx.result.body,
     };
   }
   