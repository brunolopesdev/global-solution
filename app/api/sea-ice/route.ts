import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(
      "https://www.ncei.noaa.gov/access/monitoring/snow-and-ice-extent/sea-ice/G/5/data.json",
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
