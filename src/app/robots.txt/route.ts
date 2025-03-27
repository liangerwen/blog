import { getRequestOrigin } from "@/src/utils/request";
import { generateRebots } from "@/src/utils/robots";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = getRequestOrigin(request);
  const robotsTxt = generateRebots({
    userAgent: "*",
    allow: ["/"],
    sitemap: `${baseUrl}/sitemap.xml`,
  });

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
