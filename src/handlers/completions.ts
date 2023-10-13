import ENV from '../env';
import { FastifyRequest, FastifyReply } from 'fastify';
import { OutgoingHttpHeaders } from 'http';
import { Readable } from 'node:stream';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: ENV.OPENAI_KEY,
});

const openrouter = new OpenAI({
  apiKey: ENV.OPENROUTER_KEY,
  baseURL: `${ENV.OPENROUTER_HOST}/api/v1`,
  defaultHeaders: {
    'HTTP-Referer': ENV.HTTP_REFERER,
    'X-Title': ENV.OWNER,
  },
});

type ChatCompletionParams = OpenAI.Chat.Completions.ChatCompletionCreateParams;

function selectApi(body: ChatCompletionParams) {
  if (body.model.includes('gpt-4-32k')) {
    body.model = 'openai/gpt-4-32k';
    return openrouter;
  } else {
    return openai;
  }
}

export async function chatCompletionHandler(request: FastifyRequest, reply: FastifyReply) {
  const log = request.server.log;
  try {
    log.info('chatCompletionHandler received request');
    const body = request.body as ChatCompletionParams;
    const api = selectApi(body);
    log.info(`Using API: ${typeof api} for model ${body.model}`);

    // Streaming response requested
    if (body.stream) {
      // Hijack the reply stream, so we can write to it directly
      reply.hijack();

      // Open AI Stream
      const response = await api.chat.completions.create(body).asResponse();
      log.info('Opened AI Stream');

      // Copy response headers to the reply headers
      const replyHeaders: OutgoingHttpHeaders = {};
      response.headers.forEach((val, key) => {
        replyHeaders[key] = val;
      });

      // Write headers to reply stream
      reply.raw.writeHead(200, replyHeaders);
      log.info('Wrote Response Stream headers');

      // Write each chunk as it is received to the reply stream
      log.info('Streaming AI Stream to Response Stream');
      let chunksProxied = 0;
      response.body.on('data', (chunk: Buffer) => {
        reply.raw.write(chunk);
        chunksProxied++;
      });

      reply.raw.on('close', () => {
        reply.raw.statusCode = 499;
        reply.raw.end('\n\ndata: [END]\n\n', 'utf-8');
        (response.body as Readable).destroy();
        log.info('Client closed connection prematurely, closing AI Stream');
      });

      // Close the reply stream when the AI stream closes
      response.body.on('end', () => {
        reply.raw.end();
        log.info(`Streams closed, wrote ${chunksProxied} chunks to Response Stream`);
      });

      // Close the reply stream if the AI stream errors
      response.body.on('error', (err: any) => {
        log.info('AI Stream sent an error', err);
        reply.raw.statusCode = response.status ?? 500;
        reply.raw.end(err);
      });
    }

    // Buffered response, ezpz
    else {
      const response = await api.chat.completions.create(body);
      reply.send(response);
    }
  } catch (err) {
    log.error(err);
    reply.status(500).send(`Error: ${err}`);
  }
}
