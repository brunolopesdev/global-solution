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
  const [loading, setLoading] = useState<boolean>(false);
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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (formData.image) {
        const imgurFormData = new FormData();
        imgurFormData.append("image", formData.image);

        const imgurResponse = await axios.post(
          "https://api.imgur.com/3/image",
          imgurFormData,
          {
            headers: {
              Authorization: "Client-ID c07474c64c85cd6",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = imgurResponse.data.data.link;
      }

      const reportData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        lat: formData.lat,
        lng: formData.lng,
        image: imageUrl,
      };

      const response = await axios.post(
        "https://gs-backend-one.vercel.app/reports",
        reportData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Report submitted successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });

      setLoading(false);
    } catch (err) {
      Swal.fire({
        title: "Error submitting report",
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(false);
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
          maxLength={250}
          placeholder="Max 250 characters"
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
      <Button
        type="submit"
        colorScheme="blue"
        w={"100%"}
        marginTop={"10px"}
        textTransform={"uppercase"}
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
};

export default ReportForm;
