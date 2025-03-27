import { NextRequest } from "next/server";

export const getRequestOrigin = (request: NextRequest) => {
  const url = new URL(request.url);
  return url.origin;
};
