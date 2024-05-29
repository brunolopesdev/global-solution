import { NextApiRequest, NextApiResponse } from "next";

interface OceanData {
  data: any;
  description: string;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await fetch(
        "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/5/data.json"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data: OceanData = await response.json();

      // CORS configuration
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      );

      // Caching the response for one day
      res.setHeader("Cache-Control", "s-maxage=43200, stale-while-revalidate");

      // Respond with the fetched data
      res.status(200).json({
        error: null,
        result: data.data,
        description: data.description,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message, result: null });
    }
  } else {
    // Respond with 405 Method Not Allowed if the method is not GET
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
