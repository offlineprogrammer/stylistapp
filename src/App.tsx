import { FormEvent, useState } from "react";
import {  generateTextFromPrompt } from "./actions";
import './App.css';

import { v4 } from 'uuid'


type msgObj = { id: string; author: 'me' | 'Bot'; text: string }

function App() {

  const [isLoading,setIsLoading] = useState(false)
  const [msgText, setMsgText] = useState('')
  const [msgs, setMsgs] = useState<Array<msgObj>>([
		{
			id: '1',
			author: 'Bot',
			text: 'Hi, I’m your personal stylist. Let’s find an outfit that makes you feel comfortable and confident! Can you tell me more about what you are looking for?',
		},
	]);
  const [sessionId, setSessionId] = useState<null | string>(null)

  const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setMsgText('')
		setIsLoading(true)
		// Store the initial state change
		const userMessage: msgObj = {
			id: v4(),
			author: 'me',
			text: msgText,
		}

		setMsgs([...msgs, userMessage])

		try {

			const {data,errors} = await generateTextFromPrompt(
        msgText, sessionId  || '')

        console.log(data);

			if(data){
        console.log(data?.sessionId);
			setSessionId(data?.sessionId)
console.log(data?.text);
			// Combine the initial state change with the updated state
			setMsgs((prevMsgs) => [
				...prevMsgs,
				{
					id: v4(),
					author: 'Bot',
					text: data?.text,
				} as msgObj,
			])
			setIsLoading(false)
		}
		if (errors) {
			console.error('Error generating text from prompt:', errors)
			setMsgs((prevMsgs) => [
				...prevMsgs,
				{
					id: v4(),
					author: 'Bot',
					text: "Something went wrong",
				} as msgObj,
			])
			setSessionId(null)
			setIsLoading(false)
			return
		}
		} catch (error) {
			console.error('Error generating text from prompt:', error)
			setIsLoading(false)
		}
	}



  return (

    <div className="app-container">
      <header className="header">
        <div className="header-content">AI Stylist</div>
      </header>
      <div className="chat-container">
        {msgs.map((msg) => (
          <div
            key={msg.id}
            className={`message-wrapper ${msg.author === 'me' ? 'message-right' : 'message-left'}`}
          >
            <div
              className={`message ${msg.author === 'Bot' ? 'message-bot' : 'message-user'}`}
            >
              <p className="message-text">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && <div className="loader">Loading...</div>}
      </div>
      <form onSubmit={handleFormSubmit} className="input-form">
        <input
          className="input-field"
          placeholder="Type your message..."
          type="text"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
        />
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>


    // <div className="app-container">
    //   <div className="chat-container">
    //     <div className="suggestions">
    //       {loading ? (
    //         <div className="suggestion-bubble">Loading...</div>
    //       ) : (
    //         result && (
    //           <div className="suggestion-bubble whitespace-pre-wrap">
    //             <p>{result}</p>
    //           </div>
    //         )
    //       )}
    //     </div>
    //     <div className="input-form-container">
    //       <form className="input-form" onSubmit={onSubmit}>
    //         <input
    //           type="text"
    //           className="wide-input"
    //           id="prompt"
    //           name="prompt"
    //           placeholder="Enter your prompt"
    //         />
    //         <button className="search-button" type="submit">Get Suggestions</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
