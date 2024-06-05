import { Report } from "@/app/report/page";
import { Box, Button } from "@chakra-ui/react";
import { Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import ReportModal from "../Modal/ReportModal";

interface Props {
  data: Report[];
}

const Maps = ( { data }: Props ) => {
  console.log('data', data)
  const [markerRef, marker] = useMarkerRef();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (!marker) {
      return;
    }
  }, [marker]);

  return (
    <Box w="90%" h="500px">
      <Map
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {data.map((report) => (
          <Marker
            ref={markerRef}
            position={{ lat: report.lat, lng: report.lng }}
            clickable={true}
            onClick={() => openModal(report)}
          />
        ))}
      </Map>

      <ReportModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </Box>
  );
};

export default Maps;
