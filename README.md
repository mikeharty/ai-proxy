# AI Proxy

This is a proxy designed to be run locally to proxy requests to the [OpenAI](https://openai.com/) and [OpenRouter](https://openrouter.ai/) APIs.

OpenAI hasn't made GPT-4 32k available in their official API, but OpenRouter makes it available. This proxy makes it possible to configure a single API endpoint that can access any models supported by either provider. Simply specify `gpt-4-32k` as the model name to access OpenRouter's version of GPT-4 32k.

The GPT-4 32k model is useful you want to provide a massive amount of context (32k tokens, or roughly 25k words) with your prompt.

**Note:** The GPT-4 32k model is slower, and also twice as expensive as GPT-4 8k at the moment. Further, using the GPT-4 32k model is very expensive, so I recommend using it only when you need the additional context, and controlling the exact context provided to minimize the added cost.

## Installation

Install dependencies:

```sh
npm install
```

Configure:

See `/.env.example` for an example configuration. Use `/.env` to override the defaults.

You must set `OPENROUTER_KEY` and/or `OPENAI_KEY`.

## Usage

For development/local hosting:

```
npx nodemon index.ts
```

For production:

Build:

```sh
tsc
```

Run:

```sh
node dist/index.js
```

## Future plans

- [x] Add support for OpenRouter's GPT-4 32k
- [x] Add support for OpenAI's models (any of them)
- [x] Support streaming and buffered chat completions
- [ ] Prompt/response caching
- [ ] Prompt/response long-term storage
- [ ] Context compression for prompts/responses (e.g. "middle out")
- [ ] Custom behavior support via prompt directives (e.g. `#AI-ACTION: ...`)
- [ ] Add support for other AI models
