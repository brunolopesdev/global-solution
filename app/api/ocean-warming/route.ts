import { NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(
      "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/ocean/12/1/1850-2024.json?trend=true&trend_base=10&begtrendyear=1880&endtrendyear=2024",
      {
        headers: {
          allow: "GET",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json({ error: "Failed to fetch reports" });
  }
}
