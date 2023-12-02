import React from "react";
import './AboutUs.css'
import teamImage from "../../images/team.png";


const AboutUs = () => {

  return (
    <>
      <section className="text-background">
        <h1 className="title">About Us</h1>
        <p className="about-us-text">
          Welcome to BudgetBites! Have you ever wondered which grocery store you should go to to get the cheapest prices?
          With BudgetBites, you will never have to ask that question again!
          Simply go to the Groceries tab and select all the groceries you need. Then enter your zip code
          and click "Calculate Cart", and our cutting edge technology will calculate the prices of all nearby stores,
          showing you which ones would be the cheapest for you. From there, you can see a breakdown of the price per item
          at each store and make an educated decision of which grocery store to go to. 
        </p>
        <br/>
        <p className="about-us-text">
          Our team is composed of three very smart software engineers, which offer the latest developments in the computer science
          industry to offer you the best user experience possible. 
        </p>
        
      </section>
      <img className="team-photo" src={teamImage} alt="team"/>
      
    </>
  )
}


export default AboutUs