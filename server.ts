import { renderApplication } from "@angular/platform-server";
import bootstrap from "src/main.server";

interface Env {
  ASSETS: {fetch: typeof fetch}
}

async function workerFetchHandler(request: Request, env: Env) {
  const url = new URL(request.url);
  console.log('render SSR:', url.href);

  const indexUrl = new URL("/app", url);
  const indexResponse = await env.ASSETS.fetch(new Request(indexUrl));
  const document = await indexResponse.text();

  const content = await renderApplication(bootstrap, {
    url: url.pathname,
    document,
  });

  return new Response(content, indexResponse);
}

export default {
  fetch: (request: Request, env: Env) => 
  (globalThis as any)["__zone_symbol__Promise"].resolve(
    workerFetchHandler(request, env)
  )
};