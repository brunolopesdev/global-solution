import { Box } from "@chakra-ui/react";
import { Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

const Maps = () => {
  const [markerRef, marker] = useMarkerRef();


  useEffect(() => {
    if (!marker) {
      return;
    }

    // do something with marker instance here
  }, [marker]);

  return (
    <Box w="90%" h="500px">
      <Map
        // style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Marker
          ref={markerRef}
          position={{ lat: 53.54992, lng: 10.00678 }}
          clickable={true}
        />
      </Map>
    </Box>
  );
};

export default Maps;
