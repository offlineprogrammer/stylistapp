import { amplifyClient } from "./amplify-utils";

export async function generateStyle(formData: FormData) {
    console.log("formData", formData.get("prompt")?.toString());
  const response = await amplifyClient.queries.generateStyle({
    prompt: formData.get("prompt")?.toString() || "",
    });

    
console.log(response);
  const res = JSON.parse(response.data?.body);
  const content = res.content[0].text;
  console.log("content", content);
  return content || "";
}