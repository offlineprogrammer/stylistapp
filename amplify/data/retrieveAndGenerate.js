export function request(ctx) {
    console.log('request ctx', ctx);
  
    const baseBody = {
      input: {
        text: ctx.args.text,
      },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
            knowledgeBaseId: 'SKOBM6FMJ7',
            modelArn: ctx.env.bedrockArn,
        }

      },
    };
  
    if (ctx.args.sessionId) {
      baseBody.sessionId = ctx.args.sessionId;
    }
  
    return {
      resourcePath: '/retrieveAndGenerate',
      method: 'POST',
      params: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: baseBody,
      },
    };
  }
  
  export function response(ctx) {
    console.log('response ctx', ctx);
    const parsedBody = JSON.parse(ctx.result.body);
  
    // Extract the main text response
    let textResponse = parsedBody.output?.text || "Couldn't generate a response, Try again";
  
    const res = {
      text: textResponse,
      sessionId: parsedBody.sessionId,
    };
  
    console.log(res);
    return res;
  }
  