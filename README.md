# AI Proxy

> Resurrected 10/16/24 to use OpenAI's o1-preview model via OpenRouter.

The readme below is still roughly accurate, but the o1-preview model has the same token limit as the current default (gpt-4o). o1-preview is trained with reinforcement learning to perform complex reasoning. It is quite slow and costs significantly more than gpt-4o, but it is dramatically better at solving math, programming, and and logic based questions.

o1-preview:
```
$15.00 / 1M input tokens
$7.50 / 1M cached input tokens
$60.00 / 1M output tokens
```
gpt-4o:
```
$2.50 / 1M input tokens
$1.25 / 1M cached** input tokens
$10.00 / 1M output tokens
```

This is a project designed to be run as a local proxy/router for [OpenAI](https://openai.com/) and [OpenRouter](https://openrouter.ai/) APIs.

OpenAI hasn't made GPT-4 32k available in their API for personal users, but OpenRouter has. This proxy provides an endpoint that switches between providers depending on the model selected. Simply specify `gpt-4-32k` as the model name to access OpenRouter's version of GPT-4 32k.

The GPT-4 32k model is useful when you want to provide a massive amount of context (32k tokens, or roughly 25k words) with your prompt.

**Note:** The GPT-4 32k model is considerably slower, and also twice as expensive as GPT-4 8k at the moment. I recommend using it only when you need the additional context, and being wary of plugins/integrations that bloat the context size. I will be adding context compression features to this proxy soon.

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
npx nodemon src/main.ts
```

For production:

Build:

```sh
npm run build
```

Run:

```sh
node dist/main.js
```

## Future plans

- [x] Add support for OpenRouter's GPT-4 32k
- [x] Add support for OpenAI's models (any of them)
- [x] Support streaming and buffered chat completions
- [ ] Prompt/response caching
- [ ] Prompt/response long-term storage
- [ ] Context compression for prompts/responses (e.g. "middle out")
- [ ] Custom behavior via prompt directives (e.g. `#include-dir: /my-project` or `#cache: false`)
- [ ] Add support for AI models beyond OpenAI's (Meta CodeLlama, Phind CodeLlama, Mistral-7B)
