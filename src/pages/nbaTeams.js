import React, { useState } from "react";
import DetailsDrawer from "../components/detailsDrawer";
import TeamsTable from "../components/teamsTable";
import styles from "./nbaStyles.module.css";

function NbaTeams() {
  const [state, setState] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);
  

  const toggleDrawer = () => {
    setState((prev) => !prev);
  };

  return (
    <div>
      <h1 className={styles.heading}>NBA TEAMS:</h1>
      <TeamsTable
        toggleDrawer={toggleDrawer}
        setTeamDetails={setTeamDetails}
        teams={teams}
        setTeams={setTeams}
        
      />
      {teamDetails ? (
        <DetailsDrawer
          state={state}
          toggleDrawer={toggleDrawer}
          teamDetails={teamDetails}
        />
      ) : null}
    </div>
  );
}

export default NbaTeams;
