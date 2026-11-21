/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Only POST is accepted.", { status: 405 });
    }
    let body;
    try {
      body = await request.json()
    } catch (error) {
      return new Response("Only valid JSON is accepted.", {status: 400});
      
    }
    if (
      body === null||
      typeof body.message !== "string"||
      body.message.length < 1|| 
      body.message.length > 1000 
    ){
      return Response.json({ error: "message must be between 1 and 1000 characters"}, {status:400});
    }

    return Response.json(body);

  },
};
