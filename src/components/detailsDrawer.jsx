import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import style from "./componentsStyle.module.css";
import { dateFormatter } from "../utils/dataFormatter";

export default function DetailsDrawer({
  state,
  toggleDrawer,
  teamDetails,
  rowId,
}) {
  const [gameDetails, setGameDetails] = useState(null);

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
    <React.Fragment>
      <div className={style.drawer}>
        <Drawer
          sx={{ width: 800 }}
          anchor='right'
          open={state}
          onClose={toggleDrawer}
        >
          <section className={style.headingWraper}>
            <div className={style.teamName}>
              {gameDetails?.home_team?.full_name}
            </div>
            <span onClick={() => toggleDrawer()}>X</span>
          </section>

          <section className={style.desc}>
            <section className={style.teamDetails}>
              <div>Team Full Name</div>
              <div>{gameDetails?.home_team?.full_name}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Total Games in 2021</div>
              <div>{gameDetails?.home_team_score}</div>
            </section>
          </section>

          <section className={style.gameDesc}>
            <h4>Random Game Details:</h4>
            <section className={style.teamDetails}>
              <div>Date</div>
              <div>{dateFormatter(gameDetails?.date)}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Home Team</div>
              <div>{gameDetails?.home_team?.full_name}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Home Team Score</div>
              <div>{gameDetails?.home_team_score}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Visitor Team</div>
              <div>{gameDetails?.visitor_team?.full_name}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Visitor Team Score</div>
              <div>{gameDetails?.visitor_team_score}</div>
            </section>
          </section>
        </Drawer>
      </div>
    </React.Fragment>
  );
}
