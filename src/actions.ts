import { amplifyClient } from "./amplify-utils";

export async function generateTextFromPrompt(text: string, sessionId: string) {
  console.log("text", text);
  console.log("sessionId", sessionId);
const response = await amplifyClient.queries.generateTextFromPrompt({
  text: text,
  sessionId: sessionId,
  });

  
  
console.log(response);
return response || "";
}