'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import seaIceJson from '@/app/utils/sea-ice.json'
import oceanWarmingJson from '@/app/utils/ocean-warming.json'

import styles from "./charts.module.scss";

interface Description {
  title: string;
  basePeriod: string;
  units: string;
  mean: number;
  decadalTrend: number;
  missing: number;
}

interface YearData {
  value: number;
  anom: number;
}

interface Data {
  description: Description;
  data: {
    [year: string]: YearData;
  };
}

interface SeaIceData {
  title: string;
  basePeriod: string;
  units: string;
  mean: number;
  decadalTrend: number;
  missing: number;
  year: number;
  value: number;
  anom: number;
}

interface OceanData {
  title: string;
  units: string;
  base_period: string;
  missing: string;
  year: number;
  value: number;
  anom: number;
}

export const SeaIceChart = () => {
  const [seaIceData, setSeaIceData] = useState<SeaIceData[]>();

  function transformSeaIceData(seaData: Data | null) {
    if (!seaData) return []; // Return empty array if seaData is null

    const { description, data } = seaData;

    const transformedArray = Object.keys(data).map((year) => ({
      ...description,
      year: parseInt(year),
      value: data[year].value,
      anom: data[year].anom,
    }));

    return transformedArray;
  }

  // const fetchSeaIceData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/5/data.json",
  //     );
  //     const data = response.data;

  //     if (!data || data.error) {
  //       console.error("Failed to fetch sea ice data", data?.error);
  //       return;
  //     }

  //     const transformedData = transformSeaIceData(data);
  //     setSeaIceData(transformedData);
  //   } catch (err) {
  //     console.error("Error fetching sea ice data", err);
  //   }
  // };

  useEffect(() => {
    // fetchSeaIceData();
    const transformedData = transformSeaIceData(seaIceJson);

    setSeaIceData(transformedData as SeaIceData[]);
  }, []);

  if (!seaIceData) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.chartLegends}>
        <p>units: {seaIceData[0]?.units}</p>
        <p>decadal trend: {seaIceData[0]?.decadalTrend}</p>
        <p>base period: {seaIceData[0]?.basePeriod}</p>
      </div>
      <ResponsiveContainer width="100%" height={200} style={{backgroundColor: '#fff'}}>
        <LineChart
          data={Object.values(seaIceData || {})}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" color="#fff"/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          <Line type="monotone" dataKey="anom" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.chartLegends}>
        <p style={{ color: "#82ca9d", fontWeight: "700" }}>value</p>
        <p style={{ color: "#8884d8", fontWeight: "700" }}>anomaly</p>
      </div>

      <p style={{ fontSize: "12px" }}>
        <strong>Data source: </strong>
        National Centers for Environmental Information: NOAA
      </p>
    </>
  );
};

export const OceanWarmingChart = () => {
  const [oceanWarmingData, setOceanWarmingData] = useState<OceanData[]>();

  function transformOceanWarmData(
    data: any
  ): { year: number; value: number; anom: number }[] {
    const { description, data: result } = data;
    const transformedArray = Object.keys(result).map((year) => ({
      ...description,
      year: parseInt(year),
      value: parseFloat(result[year]),
      anom: parseFloat(result[year]),
    }));
    return transformedArray;
  }

  // const fetchOceanWarmingData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/ocean/12/1/1850-2024.json?trend=true&trend_base=10&begtrendyear=1880&endtrendyear=2024"
  //     );

  //     console.log("data", transformOceanWarmData(data));

  //     setOceanWarmingData(transformOceanWarmData(data));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    // fetchOceanWarmingData();
    const transformedData = transformOceanWarmData(oceanWarmingJson);
    setOceanWarmingData(transformedData as OceanData[]);
  }, []);

  if (!oceanWarmingData) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.chartLegends}>
        <p>units: {oceanWarmingData[0]?.units}</p>
        <p>base period: {oceanWarmingData[0]?.base_period}</p>
      </div>
      <ResponsiveContainer width="100%" height={200} style={{backgroundColor: '#fff'}}>
        <LineChart
          data={Object.values(oceanWarmingData || {})}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#0077be" />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.chartLegends}>
        <p style={{ color: "#fff", fontWeight: "700" }}>value (ºC)</p>
      </div>

      <p style={{ fontSize: "12px" }}>
        <strong>Data source:</strong>
        National Centers for Environmental Information: NOAA
      </p>
    </>
  );
};
