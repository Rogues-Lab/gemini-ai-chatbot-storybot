import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-50 sm:p-8 p-4 text-sm sm:text-base">
        <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold max-w-fit inline-block">
          Storybots - custom story creator
        </h1>
        <div className="leading-normal text-zinc-900">
          To use this bot the best what it to supply three part to the story:
          <ul>
            <li>1, characters</li>
            <li>2, location</li>
            <li>3, plot of the story</li>
          </ul>
        </div>
       <p className="leading-normal text-zinc-900">
          E.g. Lets do a story with a girl and her dog, named Abigail and Spot. They get lost in the forest and it is getting dark but they found there way home after a scare with evening coming in
       </p>
        <p className="leading-normal text-zinc-900 pt-8">
          This is an Story generation chatbot app template built as part of {' '}
          <ExternalLink href="https://www.buildclub.ai/">
          Build Club
        </ExternalLink>
        , using {' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, the{' '}
          <ExternalLink href="https://sdk.vercel.ai">
            Vercel AI SDK
          </ExternalLink>
          , and{' '}
          <ExternalLink href="https://ai.google.dev">
            Google Gemini
          </ExternalLink>
          .
        </p>
        <p className="leading-normal text-zinc-900">
          It uses{' '}
          <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
            React Server Components
          </ExternalLink>{' '}
          with function calling to mix both text with generative UI responses
          from Gemini. The UI state is synced through the AI SDK so the model is
          always aware of your stateful interactions as they happen in the
          browser.
        </p>
        <p className="leading-normal text-zinc-900">
          It uses a custom stable diffusion model (story diffusion) to create comic, inference on replicate
          <ExternalLink href="https://replicate.com">
            Replicate
          </ExternalLink>{' '}
          The logo was mid journey.
        </p>
      </div>
    </div>
  )
}
