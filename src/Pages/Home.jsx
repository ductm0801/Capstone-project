import React from "react";
import "../styles/home.css";
import hpTopImage from "../images/Group 1.png";
import hpMidImage from "../images/Group 2.png";
import mobileEx from "../images/mobile-example.png";
import { TiTick } from "react-icons/ti";
import icon1 from "../images/hp-icon1.png";
import icon2 from "../images/hp-icon2.png";
import icon3 from "../images/hp-icon3.png";

const Home = () => {
  return (
    <div>
      <div className="bg-top flex-wrap">
        <div className="hp-container justify-center gap-16">
          <div>
            <p
              style={{
                fontSize: "96px",
                color: "white",
                fontWeight: "bold",
                width: "575px",
              }}
            >
              <span style={{ color: "#C6C61A" }}>PICKLE</span> BALL CLUB
            </p>
            <p
              style={{
                width: "592px",
                color: "white",
                height: "90px",
                fontSize: "20px",
              }}
            >
              PickleBallClub.Com to simplify tournament management process in
              order to save your time. Join us now and you will love this.
            </p>
          </div>
          <div>
            <img src={hpTopImage} alt=""></img>
          </div>
        </div>
      </div>
      <div className="hp-middle">
        <div>
          <img src={hpMidImage} alt=""></img>
        </div>
        <div style={{ marginRight: "216px" }}>
          <p style={{ fontSize: "48px", fontWeight: "bold" }}>Elimination</p>
          <p style={{ width: "384px" }}>
            Elimination or knockout where the loser of each bracket is
            immediately eliminated from winning the championship.
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "72px",
          gap: 100,
        }}
      >
        <div>
          <img src={mobileEx} alt=""></img>
        </div>
        <div>
          <p style={{ fontWeight: "bold", fontSize: "32px" }}>Run Tournament</p>
          <p>There are 3 important periods to run your tournaments </p>
          <div style={{ display: "flex", marginTop: "48px" }}>
            <div style={{ marginRight: "32px" }}>
              <img src={icon1} alt=""></img>
            </div>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Create Tournament
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Elimination
              </p>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "72px" }}>
            <div style={{ marginRight: "32px" }}>
              <img src={icon2} alt=""></img>
            </div>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Setting a Tournament
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Input Rules, Location
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Input teams/players information
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Invite participants
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Set calendar for matches
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Customize for each stage
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", marginTop: "72px", marginBottom: "72px" }}
          >
            <div style={{ marginRight: "32px" }}>
              <img src={icon3} alt=""></img>
            </div>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                Run Tournament
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Activate
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                enter results
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                View statistics
              </p>
              <p>
                <TiTick style={{ color: "green" }} />
                Share with friends
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hp-bottom"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "460px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "48px",
            fontWeight: "bold",
          }}
        >
          Share With Friends
        </p>
        <p style={{ fontSize: "16px", width: "661px" }}>
          Share your tournaments all over the internet tubes like a real
          magician! Easily post your comments in a league dashboard and discuss
          with other followers.
        </p>
      </div>
    </div>
  );
};
export default Home;
