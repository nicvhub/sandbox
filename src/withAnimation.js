import React, { useRef, useState, useEffect } from "react";

// *** DEFINES ANIMATION KEY FRAMES
import "./index.scss";

const withAnimation = (
  WrappedComponent,
  nameOfAnimation,
  durationOfAnimation,
  initialStyle,
  displayName
) => {
  if (typeof durationOfAnimation !== "number") {
    throw new TypeError(
      "Duration of animation must be a number - did you pass a string?"
    );
  }

  // component our HOC creates
  const WrappedComponentWithAnimation = props => {
    const myAnimatedComponent = useRef();
    const [inProgressTimeout, setInProgressTimeout] = useState();

    useEffect(() => {
      if (props.animate) {
        myAnimatedComponent.current.style.animation = `${nameOfAnimation} ${durationOfAnimation}s`;
        const timeoutID = setTimeout(() => {
          // animation property so we can set/trigger it again next time
          myAnimatedComponent.current.style.animation = "";
          // clear time out reference
          setInProgressTimeout();
        }, durationOfAnimation * 1001);
        // record reference to our time out
        setInProgressTimeout(timeoutID);
      }
    }, [props.animate]);

    useEffect(() => {
      // -- REGULAR FLOW based on the useEffect above runnning

      // setInProgressTimeout(timeoutID) -> this blank body runs
      // setInProgressTimeout()          -> the tear down from our previous invocation
      //                                    will run but as the inProgressTimeout
      //                                    is already blank nothing happens

      // -- UNMOUNTING mid animation

      // setInProgressTimeout(timeoutID) -> this blank body runs
      // ****UNMOUNT****                 -> the tear down from our previous invocation
      //                                    this time as inProgressTimeout
      //                                    had a value at the time, the clean up will happen

      return () => {
        // tear down on unmount
        if (inProgressTimeout) clearTimeout(inProgressTimeout);
      };
    }, [inProgressTimeout]);

    return (
      <WrappedComponent
        {...props}
        style={{
          ...props.style,
          ...initialStyle
        }}
        ref={myAnimatedComponent}
      />
    );
  };
  WrappedComponentWithAnimation.displayName = `${
    displayName ? displayName : "WithAnimation"
  }(${getDisplayName(WrappedComponent)})`;

  return WrappedComponentWithAnimation;
};

// helper to set display name when using dev tools
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

//     ^        ___       ___           _   _     _____      ___        _____
// U  /"\  u   |  _"\    |  _"\        |'| |'|  \| ___"|/ U |  _"\ u  \| ___"|/
//  \/ _ \/   /| | | |  /| | | |      /| |_| |\  |  _|"    \| |_) |/   |  _|"
//  / ___ \   U| |_| |\ U| |_| |\     U|  _  |u  | |___     |  _ <     | |___
// /_/   \_\   |____/ u  |____/ u      |_| |_|   |_____|    |_| \_\    |_____|
//  \\    >>    |||_      |||_         //   \\   <<   >>    //   \\_   <<   >>
// (__)  (__)  (__)_)    (__)_)       (_") ("_) (__) (__)  (__)  (__) (__) (__)

// to add a new animation - add a keyframe definition in index.scss
// then use the with animation wrapper to create the higher order
// component to present a minimal interface without having
// the user to set the keyframe name or sensible inital
// style required for the animation to work
export const withFadeInAndOut = (component, duration) => {
  return withAnimation(
    component, // component to wrap
    "fade-in-out", // keyframe id in index.scss
    duration, // duration of animation
    { zIndex: 9 },
    "WithFadeInAndOut" // display name while debugging component tree
  );
};

export const withSildeInAndOut = (component, duration) => {
  return withAnimation(
    component, // component to wrap
    "slide-in-out", // keyframe id in index.scss
    duration, // duration of animation
    null,
    "WithSildeInAndOut" // display name while debugging component tree
  );
};

export const withBounce = (component, duration) => {
  return withAnimation(
    component, // component to wrap
    "bounce", // keyframe id in index.scss
    duration, // duration of animation
    null,
    "WithBounce" // display name while debugging component tree
  );
};

export const with360 = (component, duration) => {
  return withAnimation(
    component, // component to wrap
    "three-sixty", // keyframe id in index.scss
    duration, // duration of animation
    null,
    "With360" // display name while debugging component tree
  );
};

export const withShudder = (component, duration) => {
  return withAnimation(
    component, // component to wrap
    "shudder", // keyframe id in index.scss
    duration, // duration of animation
    {
      position: "relative"
    },
    "WithShudder" // display name while debugging component tree
  );
};
