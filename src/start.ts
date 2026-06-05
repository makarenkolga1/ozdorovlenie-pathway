import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const requestLogger = createMiddleware().server(async ({ next, request }) => {
  const started = Date.now();
  const url = new URL(request.url);
  const path = url.pathname + url.search;
  const ua = request.headers.get("user-agent") ?? "-";
  const ref = request.headers.get("referer") ?? "-";
  const cf = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "-";

  console.log(`[req] -> ${request.method} ${path} ip=${cf} ref=${ref} ua="${ua}"`);

  try {
    const result = await next();
    const ms = Date.now() - started;
    const status = (result as { response?: Response })?.response?.status ?? "?";
    console.log(`[req] <- ${request.method} ${path} status=${status} ${ms}ms`);
    return result;
  } catch (error) {
    const ms = Date.now() - started;
    console.error(`[req] !! ${request.method} ${path} threw after ${ms}ms`, error);
    throw error;
  }
});

const errorMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(`[ssr-error] ${request.method} ${request.url}`, error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [requestLogger, errorMiddleware],
}));

