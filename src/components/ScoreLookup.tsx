import { useScores } from "../dataFetches/useScores";
import { useState } from "react";
import {
  calculateAverageScore,
  getCompetencyType,
  calculateLowestScore,
  calculateHighestScore,
  calculateLowestLevel,
  calculateHighestLevel,
  calculateAverageLevel
} from "../utils/calculations";
import "../styles/ScoreLookup.css"; // Import the CSS file for styling

const ScoreLookup = () => {

// Use the useScores hook to get scores, competencies, and loading state
const { scores, competencies, loading } = useScores();

const SummaryTypes =["Average", "Lowest", "Highest", "Type"];

// State to manage the selected option (Participant or Summary)
const [selectedOption, setSelectedOption] = useState("");

// State to manage the selected competency and participant
const [selectedCompetency, setSelectedCompetency] = useState("");
const [selectedParticipant, setSelectedParticipant] = useState("");
const [selectedSummary, setSelectedSummary] = useState("");

// State to manage the output message
const [output, setOutput] = useState<string>("");

// Check if the scores are still loading
if (loading) return <p>Loading scores...</p>;

// Function to show the score for the selected participant and competency
const handleParticipantScore = () => {      
  const competencyValues = scores.map((score) => score[selectedCompetency]);
  const competencyType = getCompetencyType(competencyValues[0]);

  // Find the score for the selected participant and competency with optional chaining for if participant is not found  
  const participantScore = scores.find((score) => score.Participant === selectedParticipant)?.[selectedCompetency];  
      if (competencyType === "score") {
        setOutput(`The score for ${selectedParticipant} in ${selectedCompetency} is ${participantScore}.`);
      } else if (competencyType === "Level") {
        setOutput(`The level for ${selectedParticipant} in ${selectedCompetency} is ${participantScore}.`);
      } else {
        setOutput("Unknown competency type.");
      }

      if (competencyType === "level") {
        setOutput(`The level for ${selectedParticipant} in ${selectedCompetency} is '${participantScore}'.`);
      }    
};

// Function to show the summary score for the selected competency
const handleSummaryScore = () => {
  const competencyValues = scores.map((score) => score[selectedCompetency]);
  const competencyType = getCompetencyType(competencyValues[0]);
  
  // Filter out null or undefined values
  const validValues = competencyValues.filter((value) => value !== null && value !== undefined);

    if (competencyType === "score" || competencyType === "Score") {
     // Perform numeric calculations
      switch (selectedSummary) {
        case "Lowest": {
          const lowest = calculateLowestScore(validValues as number[]);
          setOutput(`The lowest score for ${selectedCompetency} is ${lowest}.`);
          break;
        }
        case "Highest": {
          const highest = calculateHighestScore(validValues as number[]);
          setOutput(`The highest score for ${selectedCompetency} is ${highest}.`);
          break;
        }
        case "Average": {
          const average = calculateAverageScore(validValues as number[]);
          setOutput(`The average score for ${selectedCompetency} is ${average}.`);
          break;
        }
        case "Type":
          setOutput(`The type of ${selectedCompetency} is 'score'.`);
          break;
          default:
          setOutput("Unknown summary type.");
        }
    } else if (competencyType === "level" || competencyType === "Level") {
    // Perform alphabetical calculations
        switch (selectedSummary) {
        case "Average": {
          const averageLevel = calculateAverageLevel(validValues as string[]);
          setOutput(`The average level for ${selectedCompetency} is '${averageLevel}'.`);
          break;
        }  
        case "Lowest": {
          const lowestLevel = calculateLowestLevel(validValues as string[]);
          setOutput(`The lowest level for ${selectedCompetency} is '${lowestLevel}'.`);
          break;
        }
        case "Highest": {
          const highestLevel = calculateHighestLevel(validValues as string[]);
          setOutput(`The highest level for ${selectedCompetency} is '${highestLevel}'.`);
          break;
        }
        case "Type":
          setOutput(`The type of ${selectedCompetency} is 'level'.`);
          break;
          default:
          setOutput("Unknown summary type.");
        }
      } else {
          setOutput("Unknown score.");
        }
}

// Function to handle form submission
const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Validation of form fields
      if (!selectedCompetency) {
        alert("Please select a competency.");
        return;
      }
      if (selectedOption === "Participant" && !selectedParticipant) {
        alert("Please select a participant.");
        return;
      }
      if (selectedOption === "Summary" && !selectedSummary) {
        alert("Please select a summary.");
        return;
      }    

      // Call the appropriate function based on the selected option
      if (selectedOption === "Participant") {
        handleParticipantScore();
      } else if (selectedOption === "Summary") {
        handleSummaryScore();
      }
};  

  return (
    <div className="score-lookup">
      <form>
        {/* Competency Dropdown */}
        <label>
          Competency
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              >
              <option value="" disabled>
                Select competency
              </option>  
              {competencies.map((competency, index) => (
                
                <option key={index} value={competency}>
                 {competency}
                </option>
              ))}
            </select>
        </label>

        {/* Radio Buttons for Participant or Summary */}
        <div className="radio-group">
          <input 
            type="radio" 
            value="Participant"
            name="option"
            checked={selectedOption === "Participant"}
            onChange={(e) => {
              setSelectedOption(e.target.value)
              setSelectedSummary(""); // Reset summary when participant is selected
            }}
                /> Participant
          <input 
            type="radio" 
            value="Summary" 
            name="option"
            checked={selectedOption === "Summary"} 
            onChange={(e) => {
            setSelectedOption(e.target.value)
            setSelectedParticipant(""); // Reset participant when summary is selected
            }}           
            /> Summary
        </div>    
        
        <div className="extra-options">     
         {/* Participant Dropdown */}
         {selectedOption === "Participant" && (
            <label>
              Participant
              <select
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
              >
              <option value="" disabled>
                Select participant
              </option>  
               {scores.map((score, index) => (
                  <option key={index} value={score.Participant}>
                    {score.Participant}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Summary Dropdown */}
          {selectedOption === "Summary" && (
            <label>
              Summary
              <select
              value ={selectedSummary}
              onChange={(e) => setSelectedSummary(e.target.value)}
              >
                <option value="" disabled>
                 Select Summary
                </option>  
                {SummaryTypes.map((summaryType, index) => (
                  <option key={index} value={summaryType}>
                    {summaryType}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {/* Submit Button */}        
        <button 
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // Handle the form submission logic here
            handleSubmit(e);
          }}
        >Show score</button>
      </form>

      {/* Output Div */}
      {output && (
        <div className="output">
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

export default ScoreLookup;
