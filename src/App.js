import React, { useState, forwardRef } from "react";
import {
  withFadeInAndOut,
  withSildeInAndOut,
  withBounce,
  with360,
  withShudder
} from "./withAnimation";

const Person = forwardRef((props, ref) => {
  return (
    <div ref={ref} onClick={props.onClick} style={{ ...props.style }}>
      {props.name}
    </div>
  );
});

const SlowFader = withFadeInAndOut(Person, 4.4);
const Slider = withSildeInAndOut(Person, 12);
const Bounce = withBounce(Person, 5.5);
const Spin = with360(Person, 0.75);
const Shudder = withShudder(Person, 0.75);
const App = () => {
  const [jordan, setJordan] = useState(false);
  const [shane, setShane] = useState(false);
  const [sybil, setSybil] = useState(false);
  const [nic, setNic] = useState(false);
  const [whisk, setWhisk] = useState(false);

  const commonStyle = {
    color: "white",
    width: "100px",
    height: "30px",
    borderRadius: "12px",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "courier",
    display: "flex",
    margin: "15px"
  };

  return (
    <div
      style={{
        flexDirection: "column",
        paddingLeft: "42%",
        paddingTop: "35%",
        height: "100vh",
        backgroundColor: "black"
      }}
    >
      <Slider
        animate={whisk}
        onClick={() => {
          setWhisk(true);
          setTimeout(() => {
            setWhisk(false);
          }, 1000);
        }}
        style={{
          width: "100px",
          height: "30px",
          borderRadius: "12px",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "courier",
          display: "flex",
          margin: "15px",
          color: "blue",
          backgroundColor: "aquamarine"
        }}
        name="Whsikers"
      />
      <Bounce
        onClick={() => {
          setShane(true);
          setTimeout(() => {
            setShane(false);
          }, 1000);
        }}
        animate={shane}
        style={{
          ...commonStyle,
          ...{
            color: "blue",
            backgroundColor: "lightgreen"
          }
        }}
        name="Shane"
      />
      <SlowFader
        onClick={() => {
          setNic(true);
          setTimeout(() => {
            setNic(false);
          }, 1000);
        }}
        animate={nic}
        style={{
          ...commonStyle,
          ...{
            color: "black",
            backgroundColor: "pink"
          }
        }}
        name="Nic"
      />
      <Spin
        onClick={() => {
          setSybil(true);
          setTimeout(() => {
            setSybil(false);
          }, 1000);
        }}
        animate={sybil}
        style={{
          ...commonStyle,
          ...{
            color: "white",
            zIndex: "1",
            backgroundColor: "purple"
          }
        }}
        name="Sybil"
      />
      <Shudder
        onClick={() => {
          setJordan(true);
          setTimeout(() => {
            setJordan(false);
          }, 1000);
        }}
        animate={jordan}
        style={{
          ...commonStyle,
          ...{
            color: "blue",
            backgroundColor: "aquamarine"
          }
        }}
        name="Jordan"
      />
    </div>
  );
};

export default App;
