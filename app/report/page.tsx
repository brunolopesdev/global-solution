"use client";

import { Container, Box, Skeleton } from "@chakra-ui/react";

import Bubbles from "../components/Bubbles";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";

import Maps from "../components/Map/Maps";
import { Link as ScrollLink, Element } from "react-scroll";
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import ReportForm from "../components/Forms/ReportForm";

import Slider from "react-slick";

import Card from "../components/ui/Card";

export interface Report {
  name: string;
  email: string;
  message: string;
  image: string;
  lat: number;
  lng: number;
}

export default function Report() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  

  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <FaChevronRight color="#fff" size={40} />,
    prevArrow: <FaChevronLeft color="#fff" size={40} />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          dots: true,
        },
      },
    ],
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://gs-backend-one.vercel.app/reports"
      );

      console.log("data", data)

      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <main className={styles.main}>
      <Bubbles />
      <Element name="form">
        <Container
          className={styles.reportFormContainer}
          centerContent
          maxW="md"
        >
          <div className={styles.title}>
            <h1 className={styles.reportTitle}>make your report</h1>
          </div>
          <ReportForm />
          <ScrollLink to="section1" smooth={true} className={styles.scrollLink}>
            <FaChevronDown color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>

      {reports.length > 0 && (
        <Element name="section1">
          {loading ? (
            <Skeleton height="100vh" />
          ) : (
            <Container maxW="2x1" className={styles.sliderContainer}>
              <h2 className={styles.subTitle}>recent reports</h2>
              <Box className={styles.sliderBox}>
                <Slider {...settings}>
                  {reports.map((report) => (
                    <Card
                      name={report.name}
                      email={report.email}
                      image={report.image}
                      message={report.message}
                    />
                  ))}
                </Slider>
              </Box>
              <Container centerContent>
                <ScrollLink
                  to="section2"
                  smooth={true}
                  className={styles.scrollLink}
                >
                  <FaChevronDown color="#fff" size={80} />
                </ScrollLink>
              </Container>
            </Container>
          )}
        </Element>
      )}

      <Element name="section2">
        <Container maxW="2x1" centerContent className={styles.mapsContainer}>
          <h2 className={styles.subTitle}>browse other users reports</h2>
          <Maps data={reports} />
          <ScrollLink to="form" smooth={true} className={styles.scrollLink}>
            <FaChevronUp color="#fff" size={80} />
          </ScrollLink>
        </Container>
      </Element>
    </main>
  );
}
