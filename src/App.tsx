import React from 'react';
import './App.css';
import {createTestPairs, createTestPersonSet} from "./testdata/testdataCreator";
import {calculateTeams} from "./matchmaking/teamCreator";

function App() {

    const testdataPersons = createTestPersonSet();
    const testdataPairs = createTestPairs(testdataPersons);

    const teams = calculateTeams(testdataPersons, testdataPairs);

    console.log(teams);

  return (
    <div className="App">
      Hockey Team
    </div>
  );
}

export default App;
