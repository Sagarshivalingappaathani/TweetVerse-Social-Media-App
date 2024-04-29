import React from "react";
import Sidenav from "../navigation/Sidenav";
import Timeline from "../timeline/Timeline";

function Homepage() {
  return (
    <div className="flex">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <Timeline />
      </div>
    </div>
  );
}

export default Homepage;
