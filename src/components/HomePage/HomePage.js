import { Link } from "react-router-dom"
import React from "react"
import styles from "./HomePage.module.css"
import home from "../../Assets/homePage/home.png"
import services from "../../Assets/homePage/services.png"
import ind from "../../Assets/homePage/ind.png"
import graph from "../../Assets/homePage/graph.png"
import org1 from "../../Assets/homePage/org1.png"
import org2 from "../../Assets/homePage/org2.png"
import Navbar from "../Navbar"
//import s from "../../../pages/carbonCalculator"

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.homePage}>
        <div className={styles.container}>
          <div className={`${styles.gridItemLeft} ${styles.homeLeft}`}>
            <div className={styles.topText}>
              <div className={styles.slideLeft}>
                A place to <strong> track </strong> <br />
              </div>

              <div className={styles.slideRight}>
                and <strong> share </strong> your
              </div>
            </div>

            <p className={styles.bottomText}>Eco-Friendly Actions</p>

            <Link
              to="/login"
              className={styles.button}
            >
              <span>Get Started &rarr;</span>
            </Link>
          </div>

          <div className={`${styles.gridItemRight} ${styles.homeRight}`}>
            <img
              src={home}
              placeholder="blur"
              alt="Home img"
              width={450}
              height={400}
            />
          </div>
        </div>
        {/* ****************************************** */}

        {/* OUR SERVICES PART */}
        <div className={styles.ourServices}>
          <p className={styles.textHeading}>
            The awesome <strong> services </strong> we provide for the
            individuals
            <br /> and for the startups to excel in their business.
          </p>
          <div className={styles.container}>
            <div className={styles.gridItemLeft}>
              <img
                src={ind}
                placeholder="blur"
                alt="Home img"
                width={200}
                height={150}
              />
              <br />
              <p className={styles.serviceDescription}>
                Individuals in our app are the users who want to calculate their
                carbon score and who want to sell or donate waste to eco
                friendly startups and organisations.
              </p>
            </div>

            <div className={styles.gridItemRight}>
              <img
                src={services}
                placeholder="blur"
                alt="Home img"
                width={200}
                height={150}
              />
              <br />
              <p className={styles.serviceDescription}>
                Organisations are startups that are contributing to the
                environment through their eco friendly products.
              </p>
            </div>
          </div>
        </div>
        {/* ******************************************/}

        {/* THE GRAPH PART  */}
        <div className={styles.graphPart}>
          <div className={styles.container}>
            <div className={styles.gridItemLeft}>
              <img
                src={graph}
                placeholder="blur"
                alt="Home img"
                width={500}
                height={350}
              />
            </div>

            <div className={styles.gridItemRight}>
              <p className={styles.graphHeading}>
                The carbon <strong>graph</strong>
              </p>
              <br />
              <p className={styles.graphDescription}>
                We provide carbon Footprint calculator for individuals users.We
                also notify you to update your carbon score. We help you monitor
                your carbon footprint progress.
                <br />
                You can share your scores on your social media sites and compete
                with your friends and family. The one with the lowest carbon
                score wins. You can participate in/ host Monthly/ Weekly go
                green challenges and see who can go most sustainable.
                <br /> You can also win awards and badges. We provide interface
                where people/org. can buy raw materials or product directly from
                startups.
                <br />
                Rate your favourite organisations and we will feature their
                profiles.
              </p>
            </div>
          </div>
        </div>
        {/* ****************************************** */}

        {/* THE TOP ORGANISATIONS PART  */}
        <div className={styles.topOrgs}>
          <p className={styles.textHeading}>
            These are the featured top two <strong> organisations </strong>
            <br />
            which performed best in the last contest.
          </p>
          <div className={styles.container}>
            <div className={styles.gridItemLeft}>
              <img
                src={org1}
                placeholder="blur"
                alt="Home img"
                width={200}
                height={200}
              />
              <br />
              <p>
                This is a great platform to buy raw materials/ products and can
                host many events about enviromenral awareness.
                <br />
                -The Green Builders
              </p>
            </div>

            <div className={styles.gridItemRight}>
              <img
                src={org2}
                placeholder="blur"
                alt="Home img"
                width={200}
                height={200}
              />
              <br />
              <p>
                Absolutely pleased with the features of this platform and we
                really enjoyed while participating in the events.
                <br />
                -The Eco Earth
              </p>
            </div>
          </div>
        </div>
        {/* ******************************************* */}
      </div>
    </>
  )
}
