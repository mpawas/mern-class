import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3010";

async function proxyRequest(request: NextRequest, method: string) {
  const path = request.nextUrl.pathname.replace("/api", "");
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BACKEND_URL}${path}${searchParams ? `?${searchParams}` : ""}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const proxyOptions: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && method !== "HEAD") {
    const body = await request.text();
    if (body) {
      proxyOptions.body = body;
    }
  }

  try {
    const response = await fetch(url, proxyOptions);
    const responseData = await response.text();

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const responseHeaders = new Headers();
    responseHeaders.set(
      "content-type",
      isJson ? "application/json" : "text/plain",
    );

    return new NextResponse(responseData, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`Proxy error for ${method} ${url}:`, error);
    return NextResponse.json(
      { message: "Backend server is not available" },
      { status: 503 },
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request, "GET");
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, "POST");
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request, "PUT");
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, "DELETE");
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request, "PATCH");
}
