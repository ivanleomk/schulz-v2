import Link from "next/link";
import React from "react";

const Index = () => {
  return (
    <div>
      Main page. <Link href="/dashboard">Go To Dashboard</Link>
    </div>
  );
};

export default Index;
