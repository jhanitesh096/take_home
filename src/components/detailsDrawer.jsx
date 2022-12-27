import * as React from "react";
import Drawer from "@mui/material/Drawer";
import style from "./componentsStyle.module.css";

export default function DetailsDrawer({ state, toggleDrawer, teamDetails }) {
  const { full_name, conference, division, city, abbreviation } = teamDetails;

  return (
    <React.Fragment>
      <div className={style.drawer}>
        <Drawer
          sx={{ width: 800 }}
          anchor='right'
          open={state}
          onClose={toggleDrawer}
        >
          <div className={style.teamName}>{full_name}</div>
          <section className={style.desc}>
            <section className={style.teamDetails}>
              <div>Team Full Name</div>
              <div>{full_name}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Total Games in 2021</div>
              <div>{full_name}</div>
            </section>
          </section>

          <section className={style.gameDesc}>
            <h4>Random Game Details:</h4>
            <section className={style.teamDetails}>
              <div>Conference</div>
              <div>{conference}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Division</div>
              <div>{division}</div>
            </section>
            <section className={style.teamDetails}>
              <div>City</div>
              <div>{city}</div>
            </section>
            <section className={style.teamDetails}>
              <div>Abbreviation</div>
              <div>{abbreviation}</div>
            </section>
          </section>
        </Drawer>
      </div>
    </React.Fragment>
  );
}
