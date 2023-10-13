import dotenv from 'dotenv';
dotenv.config();

const penv = process.env;
const ENV: { [key: string]: any } = {};

ENV.NODE_ENV = penv.NODE_ENV || 'development';
ENV.HOST = penv.HOST || 'localhost';
ENV.PORT = penv.PORT ? parseInt(penv.PORT) : 1337;
ENV.LOG_FILE = penv.LOG_FILE || false;
ENV.LOG_LEVEL = penv.LOG_LEVEL || 'info';
ENV.OWNER = penv.OWNER || 'mikeharty/AIProxy';
ENV.HTTP_REFERER = penv.HTTP_REFERER || 'https://github.com/mikeharty/ai-proxy';
ENV.COMPLETIONS_PATH = penv.COMPLETIONS_PATH || '/api/v1/chat/completions';
ENV.OPENROUTER_HOST = penv.OPENROUTER_HOST || 'https://openrouter.ai';
ENV.OPENROUTER_KEY = penv.OPENROUTER_KEY || '';
ENV.OPENAI_KEY = penv.OPENAI_KEY || '';

export default ENV;
