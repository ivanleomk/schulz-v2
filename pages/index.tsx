import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      Home. Click here to go to <Link href="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Home;
