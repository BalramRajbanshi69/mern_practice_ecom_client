import React from "react"; 
import Profile from "./Products";
import Banner from "./Banner";


const Home = () => {
  return (
    <div>
      <Banner />
      <Profile showAddButton={false} />
    </div>
  );
};

export default Home;
