import { FormEvent, useState } from "react";
import { generateStyle } from "./actions";





function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = await  generateStyle(formData);
      const recipe = typeof data === "string" ? data : "No data returned";
      setloading(false);
      setResult(recipe);
    } catch (e) {
      alert(`An error occurred: ${e}`);
    }
  };

  return (

     <div className="app-container">
           <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto"
        >

<div className="search-container">
        <input type="text" className="wide-input"  id="prompt"
            name="prompt"
         placeholder="Enter your prompt" />
        <button className="search-button">Generate</button>
      </div>

        </form>

    </div>

  )
}

export default App