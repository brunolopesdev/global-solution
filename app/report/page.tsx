"use client";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  Checkbox,
  Container,
  Box,
} from "@chakra-ui/react";

import Bubbles from "../components/Bubbles";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";

import GoogleMapReact from "google-map-react";
import { Map } from "@vis.gl/react-google-maps";
import Maps from "../components/Map/Maps";
import Header from "../components/ui/Header";
import { Link as ScrollLink, Element } from "react-scroll";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

export default function Report() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    photo: null,
    acceptLocalization: false,
    location: [0, 0],
  });
  const [reports, setReports] = useState<Report[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            location: [position.coords.latitude, position.coords.longitude],
          }));
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("/api/reports");

      setReports(data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <main className={styles.main}>
      <Bubbles />
      <Container className={styles.reportFormContainer} centerContent maxW="md">
        <div className={styles.title}>
          <h1 className={styles.reportTitle}>make your report</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              backgroundColor={"#fff"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              backgroundColor={"#fff"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              backgroundColor={"#fff"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Upload Photo</FormLabel>
            <Input type="file" onChange={handleFileChange} />
          </FormControl>
          <FormControl>
            <Checkbox
              name="acceptLocalization"
              isChecked={formData.acceptLocalization}
              onChange={handleChange}
              onClick={requestLocation}
            >
              Accept sharing localization
            </Checkbox>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </form>
        <ScrollLink to="section1" smooth={true} className={styles.scrollLink}>
          <FaChevronDown color="#fff" size={80} />
        </ScrollLink>
      </Container>

      <Element name="section1">
        <Container maxW="2x1" centerContent className={styles.mapsContainer}>
          <h2 className={styles.subTitle}>browse other users reports</h2>
          <Maps />
        </Container>
      </Element>
    </main>
  );
}
