import React, { useEffect, useState } from "react";
import DetailsDrawer from "../components/detailsDrawer";
import TeamsTable from "../components/teamsTable";
import styles from "./nbaStyles.module.css";

function NbaTeams() {
  const [state, setState] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamDetails, setTeamDetails] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);

  const toggleDrawer = (e, obj) => {
    if (obj === "backdropClick") return;
    setState((prev) => !prev);
  };

  useEffect(() => {
    if (teamDetails && rowId) {
      const gameDetailsPlayedByTeam = teamDetails?.find(
        (game) => game?.home_team?.id === rowId
      );
      if (gameDetailsPlayedByTeam) {
        setGameDetails(gameDetailsPlayedByTeam);
      }
    }
  }, [rowId, teamDetails]);

  return (
    <div>
      <h1 className={styles.heading}>NBA TEAMS:</h1>
      <TeamsTable
        toggleDrawer={toggleDrawer}
        setTeamDetails={setTeamDetails}
        teams={teams}
        setTeams={setTeams}
        rowId={rowId}
        setRowId={setRowId}
      />
      {gameDetails ? (
        <DetailsDrawer
          state={state}
          toggleDrawer={toggleDrawer}
          setRowId={setRowId}
          gameDetails={gameDetails}
        />
      ) : null}
    </div>
  );
}

export default NbaTeams;
