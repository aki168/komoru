// 300310047900-4tgg9ie5rgbi5anu4qbkjne3t4ip8get.apps.googleusercontent.com
// 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
// const {google} = require('googleapis');
// const auth = new google.auth.GoogleAuth({
//   keyFile: './client_secret_300310047900-4tgg9ie5rgbi5anu4qbkjne3t4ip8get.apps.googleusercontent.com.json',
//   scopes: ['https://www.googleapis.com/auth/cloud-platform'],
// });
import { useEffect, useState } from 'react'
import './App.css';
import jwt_decode from 'jwt-decode'

function App() {
  const [user, setUser] = useState({})

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID Token: ' + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true

  }

  function handleSignOut(event) {
    setUser({})
    document.getElementById('signInDiv').hidden = false
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "300310047900-4tgg9ie5rgbi5anu4qbkjne3t4ip8get.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
    
    // google.accounts.id.prompt()
  }, [])
  // No user: sign in button
  // user: log out button
  return (
    <div className="App">
      <div id='signInDiv'></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>signOut</button>
      }
      {user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
        </div>
      }
    </div>
  );
}