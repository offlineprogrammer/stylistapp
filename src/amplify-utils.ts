
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";


Amplify.configure(outputs);

export const amplifyClient  = generateClient({
  authMode: "userPool",
  });