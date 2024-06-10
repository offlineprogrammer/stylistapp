import { FormEvent, useState } from "react";
import { generateStyle } from "./actions";
import './App.css';

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = await generateStyle(formData);
      const result = typeof data === "string" ? data : "No data returned";
      setLoading(false);
      setResult(result);
    } catch (e) {
      alert(`An error occurred: ${e}`);
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="suggestions">
          {loading ? (
            <div className="suggestion-bubble">Loading...</div>
          ) : (
            result && (
              <div className="suggestion-bubble whitespace-pre-wrap">
                <p>{result}</p>
              </div>
            )
          )}
        </div>
        <div className="input-form-container">
          <form className="input-form" onSubmit={onSubmit}>
            <input
              type="text"
              className="wide-input"
              id="prompt"
              name="prompt"
              placeholder="Enter your prompt"
            />
            <button className="search-button" type="submit">Get Suggestions</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
