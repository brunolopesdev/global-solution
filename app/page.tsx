'use client'

import { OceanWarmingChart, SeaIceChart } from "./components/Charts/Charts";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link as ScrollLink, Element } from "react-scroll";

import Bubbles from "./components/Bubbles";

import styles from "./page.module.scss";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Element id="hero" name="hero">
        <Container maxW={'100vw'} className={styles.oceanHero}>
          <h1 className={styles.heroTitle}>
            <span className={styles.span1}>Watch</span> <br />{" "}
            <span className={styles.span2}>our World's</span> <br />
            <span className={styles.span3}>environmental challenges</span>
          </h1>
          <ScrollLink to="section1" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#1176ab" size={80} />
          </ScrollLink>
        </Container>
      </Element>

      <Element id="section1" name="section1">
        <Container maxW={'100vw'} className={styles.oceanSection}>
          <Bubbles />
          <div className={styles.title}>
            <h2>
              <strong>69,982,000</strong> tons of sea food produced so far in{" "}
              <strong>2024</strong>
            </h2>
          </div>
          <div className={styles.text}>
            <p>
              Global seafood production includes fish caught in the wild and
              those produced in fish farms.
              <br />
              <span>
                source:{" "}
                <a href="http://www.fao.org/docrep/016/i2727e/i2727e00.htm">
                  The State of World Fisheries and Aquaculture 2012
                </a>
              </span>
            </p>
          </div>
          <ScrollLink to="section2" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>
      <Element id="section2" name="section2">
        <Container maxW={'100vw'} className={styles.oceanSection}>
          <Bubbles />
          <div className={styles.title}>
            <h2>43 Percent coral reefs left</h2>
          </div>
          <div className={styles.text}>
            <p>
              Experts estimate that there is now just half the amount of coral
              that was in the oceans 40 years ago. Scientists on the
              Intergovernmental Panel on Climate Change (IPCC) warned that if
              warming reached 2 degrees C in the next 50 years, there would be a
              more than 99% chance that tropical corals would be eradicated.{" "}
              <br />
              <span>
                source:{" "}
                <a href="https://www.theguardian.com/environment/2018/nov/11/next-generation-may-never-see-coral-reefs">
                  Next generation ‘may never see the glory of coral reefs’
                </a>
              </span>
            </p>
          </div>
          <ScrollLink to="section3" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>
      <Element id="section3" name="section3">
        <Container maxW={'100vw'} className={styles.oceanSection}>
          <Bubbles />
          <div className={styles.title}>
            <h2>
              +<strong>4m</strong> tons of discarded fish in{" "}
              <strong>2024</strong>
            </h2>
          </div>
          <div className={styles.text}>
            <p>
              The 2017 paper "Global marine fisheries discards: A synthesis of
              reconstructed data" concludes that commercial fishing has thrown
              away (discarded) about 10% of catch over the past decade meaning
              that around 10 million tons of fish are discarded at sea per year.
              The number is down from a high of 18 million tons in the 1990s.
              <br />
              <span>
                source:{" "}
                <a href="https://sustainablefisheries-uw.org/wasted-fish-what-to-make-of-recent-data-showing-10-of-fish-are-discarded-at-sea/">
                  Wasted Fish – What to Make of Recent Data Showing 10% of Fish
                  are Discarded at Sea?
                </a>
                <br />
                <a href="https://onlinelibrary.wiley.com/doi/full/10.1111/faf.12233">
                  Global marine fisheries discards: A synthesis of reconstructed
                  data
                </a>
              </span>
            </p>
          </div>
          <ScrollLink to="section4" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>
      <Element id="section4" name="section4">
        <Container maxW={'100vw'} className={styles.oceanSection}>
          <Bubbles />
          <div className={styles.title}>
            <h2>
              +<strong>4,5m</strong> tons of plastic waste dumped in oceans in{" "}
              <strong>2024</strong>
            </h2>
          </div>
          <div className={styles.text}>
            <p>
              There are quite a few estimates on how much plastic end up in our
              oceans each year, ranging from 4.8 mmt to as much as 23 mmt. Of
              course, the exact number is impossible to know but many experts
              points towards the study by PEW, that estimates that around 11
              million metric tonnes of plastic end up in oceans each year.
              <br />
              <span>
                source:{" "}
                <a href="https://www.pewtrusts.org/en/research-and-analysis/articles/2020/07/23/breaking-the-plastic-wave-top-findings">
                  PEW report is here
                </a>
                <br />
                <a href="https://www.greenpeace.org.uk/what-we-do/oceans/plastics/">
                  Greenpeace: Plastics
                </a>
              </span>
            </p>
          </div>
          <ScrollLink to="section5" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>
      <Element id="section5" name="section5">
        <Container maxW={'100vw'} className={styles.oceanSection}>
          <Bubbles />
          <div className={styles.title}>
            <h2>Sea Ice Extent</h2>
          </div>
          <div className={styles.text}>
            <SeaIceChart />
            <p>
              The arctic is warming around twice as fast as global average. Some
              of the reasons for this are: The arctic amplification, the albedo
              effect, and black carbon. From 1979 to 1996, we lost 2.2 – 3% of
              the arctic ice cover. From 2010 to present we are losing 12.85%
              per decade!
              <br />
              Another consequence is permafrost thawing. This is a process in
              which large amounts of methane is released to the atmosphere,
              fueling more the process of global warming.
            </p>
          </div>
          <ScrollLink to="section6" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>

      <Element id="section6" name="section6">
        <Container maxW={'100vw'} className={styles.oceanSection}>
          <Bubbles />
          <div className={styles.title}>
            <h2>Global Ocean Temperature Anomalies</h2>
          </div>
          <div className={styles.text}>
            <OceanWarmingChart />
            <p>
              The Co2 we produce is absorbed and dissolved into the ocean,
              making it more acidic. The ocean is also suffering from
              deoxygenation, due to contamination and global warming, making it
              less habitable for marine organism.
              <br />
              <br />
              The ocean modulates earth temperature. It takes up most of the
              excess heat that we humans produce, making it warmer, and as
              result, less able to absorb heat. Without the ocean temperature
              regulatory effect, the global average temperature would be around
              50 degrees Celsius instead of 15.
            </p>
          </div>
          <ScrollLink to="hero" smooth={true} className={styles.scrollLink}>
            <FaChevronUp color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>
    </main>
  );
}
