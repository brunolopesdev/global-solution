import axios from "axios";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "@chakra-ui/react";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import styles from "./report-form.module.scss";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    image: null,
    acceptLocalization: false,
    lat: 0,
    lng: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log('form', formData)
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }));

          console.log('form', formData)
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      // Append other form fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("lat", formData.lat.toString());
      formDataToSend.append("lng", formData.lng.toString());

      if (formData.image !== null) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        "https://gs-backend-one.vercel.app/reports",
        formDataToSend
      );
      
      Swal.fire({
        title: "Report submitted successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });

    } catch (err) {
      Swal.fire({
        title: "Error submitting report",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          backgroundColor={"#fff"}
          required
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
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Upload Photo</FormLabel>
        <Input type="file" onChange={handleFileChange} required />
      </FormControl>
      <FormControl>
        <div onClick={requestLocation}>
          <Checkbox
            name="acceptLocalization"
            isChecked={formData.acceptLocalization}
            onChange={handleChange}
            required
          >
            Accept sharing localization
          </Checkbox>
        </div>
      </FormControl>
      <Button type="submit" colorScheme="blue" w={'100%'} marginTop={'10px'} textTransform={'uppercase'}>
        Submit
      </Button>
    </form>
  );
};

export default ReportForm;
