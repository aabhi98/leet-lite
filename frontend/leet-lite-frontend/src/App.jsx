import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './User';

const users = [{
  name:"Abhishek",
  email:"abhi@asu.edu",
  password:"shek@123"
},
{
  name:"bobby",
  email:"bobby@asu.edu",
  password:"bobby@234" 
},
{
name:"salim",
email:"salim@asu.edu",
password:"salim@234"
}];

function App() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const goClick = () => {
    console.log('Email:', email, 'Password:', password, 'full Name:', fullName);
    if (isSigningUp) {
      // Add user details to the user list
      const newUser = {
        name: fullName,
        email: email,
        password: password
      };
      users.push(newUser);
      console.log('New user added:', newUser);
    } else {
      // Validate credentials against the user list
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        console.log('User signed in successfully:', user);
        // Redirect to the home page
        // Replace the below line with the code to redirect to the home page
        //alert('Redirecting to home page...');
        setUser(user);
        return <User user={user} />;
      } else {
        console.log('Invalid credentials. Please try again.');
        // Display error message to the user (e.g., show an alert)
        //alert('Invalid credentials. Please try again.');
      }
    }
  }

  if (user) {
    // If user is signed in, render the User component
    return <User user={user} />;
  } else {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Leet-Lite</h1>

      <div style={{ marginBottom: '10px' }}>

      {isSigningUp && (
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ padding: '5px', marginRight: '5px', display: 'block' }}
          />
      )}
      
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '5px', marginRight: '5px', marginTop: '5px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '5px', marginRight: '5px', marginTop: '5px' }}
        />
      </div>

      <div>
        <button onClick={() => setIsSigningUp(false)} style={{ padding: '5px 10px', marginRight: '5px' }}>Sign In</button>
        <button onClick={() => setIsSigningUp(true)} style={{ padding: '5px 10px' }}>Sign Up</button><br/>
        <button onClick={goClick} style={{ padding: '5px 10px' }}>Go</button>
      </div>
    </div>
  );
  }
}


export default App
