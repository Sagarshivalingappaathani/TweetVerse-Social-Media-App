import React from "react";
import Sidenav from "../../../components/navigation/Sidenav";
import HashTag from '@/components/HashTagPage/Hashtag'

function HashTagPage() {
  return (
    <div className="flex">
      <div className="relative flex-shrink-0 w-1/5">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <HashTag/>
      </div>
    </div>
  );
}

export default  HashTagPage;
