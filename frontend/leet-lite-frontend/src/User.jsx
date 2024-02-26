import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap'; // Import Tabs component from react-bootstrap
import './User.css';


const problemsLists = [
    [{
      title: "2-sum",
      difficulty: "Easy",
      acceptance: "70%"
    },{
      title: "Happy Number",
      difficulty: "Medium",
      acceptance: "40%"                
    },{
      title: "N-queens",
      difficulty: "Hard",
      acceptance: "30%"
    }],
    [{
      title: "Title1",
      difficulty: "Easy",
      acceptance: "70%"
    },{
      title: "Title2",
      difficulty: "Medium",
      acceptance: "40%"                
    },{
      title: "Title3",
      difficulty: "Hard",
      acceptance: "30%"
    }],
    [{
        title: "100 sums",
        difficulty: "Easy",
        acceptance: "70%"
      },{
        title: "knapsack 30",
        difficulty: "Medium",
        acceptance: "40%"                
      },{
        title: "buldozer build",
        difficulty: "Hard",
        acceptance: "30%"
      }]
  ];

const User = ({ user }) => {
    const [problems, setProblems] = useState([]);
    const [currentTab, setCurrentTab] = useState('problems');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [textInput, setTextInput] = useState('');
  
    // Fetch problem statements when the component mounts
    useEffect(() => {
      // Mock API call to fetch problem statements
      const fetchProblemStatements = async () => {
        // Your logic to fetch problem statements
        // Example:
        const response = await fetch('/api/problems');
        const data = await response.json();
        setProblems(data);
      };
      fetchProblemStatements();
    }, []);

        // Handler for selecting a language from dropdown
        const handleLanguageChange = (event) => {
            setSelectedLanguage(event.target.value);
          };
        
          // Handler for the text input change
          const handleTextInputChange = (event) => {
            setTextInput(event.target.value);
          };
        
          // Handler for the run button click
          const handleRunButtonClick = () => {
            // Logic to execute code
          };
        
          // Handler for the submit button click
          const handleSubmitButtonClick = () => {
            // Logic to submit code
          };
  
    return (
      <div>
        {/* Top div for tabs */}
        <div className="navbar">
        <span className="brand-text" style={{ fontSize: '50px', position: 'fixed', top: 0, left: 40 }}>Leet-lite</span>
          <Tabs
            defaultActiveKey="problems"
            id="user-tabs"
            onSelect={(key) => setCurrentTab(key)} // Update currentTab state when tab is changed
          >
            <Tab eventKey="problems" title="Problem Statements">
              {currentTab === 'problems' && ( // Conditionally render content only if the currentTab is 'problems'
                <div className="tabs-container">
                  <div className="left-div">
                  <ProblemButtons
                    setProblems={setProblems}
                    problemLists={problemsLists}
                  />
                    {problems.map((problem, index) => (
                      <ProblemStatements
                        key={index}
                        title={problem.title}
                        acceptance={problem.acceptance}
                        difficulty={problem.difficulty}
                      />
                    ))}
                  </div>
                  {/* Right div for coding space */}
                  <div className="right-div">
                  <select value={selectedLanguage} onChange={handleLanguageChange}>
                      <option value="">Select Language</option>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      {/* Add more language options as needed */}
                    </select><br/>
                    <input type="text" value={textInput} onChange={handleTextInputChange} />
                    <div className="button-container">
                      <button onClick={handleRunButtonClick}>Run</button>
                      <button onClick={handleSubmitButtonClick}>Submit</button>
                    </div>
                  </div>
                </div>
              )}
            </Tab>
            {/* Right div for user profile */}
            <Tab eventKey="profile" title="User Profile">
              {currentTab === 'profile' && ( // Conditionally render content only if the currentTab is 'profile'
                <div className="profile-container">
                  <h3>User Profile</h3>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  {/* Add more user profile details here */}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  };  

  function ProblemStatements(props) {
    const { title, acceptance, difficulty } = props;
  
    return (
      <div className="problem-statement">
        <div className="inner-div-1">
          <p><strong>Title:</strong> {title}</p>
        </div>
        <div className="inner-div-2">
          <p><strong>Acceptance:</strong> {acceptance}</p>
        </div>
        <div className="inner-div-3">
          <p><strong>Difficulty:</strong> {difficulty}</p>
        </div>
      </div>
    );
  }
  
  

  const ProblemButtons = ({ setProblems, problemLists }) => {
    return (
      <div style={{ marginTop: '20px', marginRight: '500px' }}>
        {problemLists.map((problems, index) => (
          <button
            key={index}
            onClick={() => {
              setProblems(problems);
            }}
            style={{
              padding: '5px 10px',
              marginRight: index < problemLists.length - 1 ? '5px' : '0', // Add marginRight to all buttons except the last one
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  

export default User;
