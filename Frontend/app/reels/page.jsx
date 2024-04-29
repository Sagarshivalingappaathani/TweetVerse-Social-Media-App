import React from "react";
import Sidenav from "@/components/navigation/Sidenav";
import ReelsPage from "@/components/ReelsPage/ReelsPage";

function ReelPage() {
  return (
    <div className="flex">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <ReelsPage/>
      </div>
    </div>
  );
}

export default ReelPage;
