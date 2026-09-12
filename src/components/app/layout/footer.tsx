'use client'

import { type ComponentProps, useEffect, useRef } from 'react'
import { PulseHeart } from '~/components/ui/pulse-heart'
import { usePostHog } from '~/hooks/use-posthog'
import { analyticsEvents } from '~/lib/analytics/events'

export function Footer() {
  const posthog = usePostHog()
  const hasCaptured = useRef(false)

  useEffect(() => {
    if (!hasCaptured.current && posthog) {
      posthog.capture(analyticsEvents.footerView, {
        section: 'footer',
      })
      hasCaptured.current = true
    }
  }, [posthog])

  const handleFooterLinkClick = () => {
    posthog?.capture(analyticsEvents.footerLinkClick, {
      destination: 'adeonir.dev',
      link_type: 'external',
      link_text: 'Adeonir Kohl',
    })
  }

  return (
    <footer>
      <section className="bg-gold-200 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-8 font-script text-5xl text-gold-700 md:text-7xl">Iria e Ari</h2>

          <div className="mb-12 flex items-center justify-center gap-4">
            <div aria-hidden="true" className="h-0.5 w-24 bg-gold-400" />
            <div aria-hidden="true" className="size-3 rounded-full bg-gold-400" />
            <div className="flex items-center justify-center">
              <PulseHeart size="md" />
            </div>
            <div aria-hidden="true" className="size-3 rounded-full bg-gold-400" />
            <div aria-hidden="true" className="h-0.5 w-24 bg-gold-400" />
          </div>

          <blockquote aria-describedby="quote-attribution" className="mx-auto max-w-lg space-y-4">
            <p className="text-lg text-zinc-600 leading-relaxed sm:text-xl">
              "O amor não consiste em olhar um para o outro, mas sim em olhar juntos na mesma direção."
            </p>
            <cite className="text-sm text-zinc-500 sm:text-base" id="quote-attribution">
              - Antoine de Saint-Exupéry
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="bg-gold-300 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 flex items-baseline justify-center gap-2 text-zinc-700">
            Site feito com carinho por
            <a
              aria-label="Link externo: Site do desenvolvedor Adeonir Kohl"
              href="https://adeonir.dev?utm_source=golden-anniversary&utm_medium=referral"
              onClick={handleFooterLinkClick}
              rel="noopener"
              target="_blank"
            >
              <AdeonirLogo className="h-auto w-32" />
            </a>
          </p>
          <p className="text-sm text-zinc-600">Desenvolvido especialmente para celebrar este momento único!</p>
        </div>
      </section>
    </footer>
  )
}

function AdeonirLogo(props: ComponentProps<'svg'>) {
  return (
    <svg
      data-slot="adeonir-logo"
      fill="none"
      height="20"
      viewBox="0 0 168 20"
      width="168"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Adeonir Kohl</title>
      <path
        d="m168 6.172-3.957 11.468h-3.371l-3.979-11.468h3.088l2.62 9.183 2.674-9.183zM146.982 12.777q.087 1.072.489 1.744.413.671 1.055.985.641.315 1.424.314.826 0 1.555-.26a6.7 6.7 0 0 0 1.435-.725l1.196 1.635q-.804.671-1.924 1.083-1.11.411-2.447.411-1.87 0-3.152-.769a4.9 4.9 0 0 1-1.925-2.133q-.652-1.364-.652-3.14 0-1.711.641-3.086.642-1.375 1.849-2.177 1.206-.812 2.913-.812 1.588 0 2.74.693t1.783 1.993q.63 1.288.631 3.108 0 .291-.022.595a9 9 0 0 1-.033.541zm2.468-4.916q-1.043 0-1.718.748-.663.735-.782 2.339h4.848q-.021-1.451-.608-2.264-.577-.822-1.74-.823M138.174 1.289l2.87.303v16.047H138.5l-.174-1.353a4.2 4.2 0 0 1-1.338 1.223q-.804.455-1.869.455-1.458 0-2.414-.758-.946-.758-1.413-2.122-.457-1.376-.457-3.194 0-1.755.544-3.12.543-1.363 1.565-2.143 1.033-.78 2.446-.78.849 0 1.544.293.696.292 1.24.866zm-2.012 6.691q-1.087 0-1.718.943-.62.93-.619 2.977 0 1.44.261 2.307.26.855.739 1.234.478.38 1.131.38a2 2 0 0 0 1.261-.423q.554-.433.957-1.072v-5.22a3.1 3.1 0 0 0-.903-.822 2.06 2.06 0 0 0-1.109-.304"
        fill="currentColor"
      />
      <path
        d="M120.983 15.723a2.2 2.2 0 0 1 .293-1.116q.305-.509.816-.812a2.17 2.17 0 0 1 1.13-.303q.631 0 1.142.303t.804.812q.305.51.305 1.116t-.305 1.126a2.21 2.21 0 0 1-1.946 1.115 2.17 2.17 0 0 1-1.13-.303 2.3 2.3 0 0 1-.816-.812 2.26 2.26 0 0 1-.293-1.126"
        className="fill-rose-600"
      />
      <path
        d="M105.531 17.64v-1.982h1.62V8.143h-1.62v-1.97h3.805l.533 2.63q.631-1.461 1.587-2.198.957-.747 2.403-.747.555 0 .979.087.435.086.826.227l-.859 2.404a6 6 0 0 0-.641-.13 4 4 0 0 0-.685-.054q-1.196 0-2.088.931-.88.921-1.37 2.502v3.833h2.294v1.981zm7.708-6.996V7.602l.392-1.43h2.033l-.511 4.472zM99.006 6.172v9.442h3.033v2.025h-9.274v-2.024h3.37V8.197h-3.261V6.172zM97.146.39q.794 0 1.283.487.5.488.5 1.213t-.5 1.223q-.489.488-1.282.488-.794 0-1.294-.488a1.66 1.66 0 0 1-.5-1.223q0-.726.5-1.213T97.147.39M79.347 17.64V6.171h2.5l.207 1.419q.74-.867 1.663-1.3a4.5 4.5 0 0 1 1.99-.444q1.554 0 2.37.899.815.888.815 2.501v8.392h-2.87v-7.276q0-.867-.109-1.386-.108-.531-.413-.758-.304-.24-.88-.239-.468.001-.903.206-.423.206-.804.552a6.5 6.5 0 0 0-.696.77v8.131zM71.093 5.847q1.717 0 2.913.747 1.197.748 1.816 2.112.63 1.353.63 3.173 0 1.862-.63 3.226-.631 1.365-1.826 2.112-1.197.747-2.914.747-1.707 0-2.914-.725-1.196-.737-1.826-2.09-.63-1.365-.63-3.249 0-1.797.63-3.162t1.837-2.122q1.207-.768 2.914-.769m0 2.155q-1.207 0-1.805.942-.587.943-.587 2.956 0 2.037.587 2.978.587.931 1.794.931 1.206 0 1.794-.93.587-.944.587-3 0-2.004-.587-2.935-.588-.942-1.783-.942M55.717 12.777q.087 1.072.49 1.744.413.671 1.054.985.642.315 1.424.314a4.6 4.6 0 0 0 1.555-.26 6.7 6.7 0 0 0 1.435-.725l1.196 1.635q-.805.671-1.924 1.083-1.11.411-2.446.411-1.87 0-3.153-.769a4.9 4.9 0 0 1-1.925-2.133q-.651-1.364-.652-3.14 0-1.711.642-3.086.64-1.375 1.848-2.177 1.206-.812 2.913-.812 1.588 0 2.74.693t1.783 1.993q.63 1.288.63 3.108 0 .291-.021.595a10 10 0 0 1-.033.541zm2.468-4.916q-1.044 0-1.717.748-.664.735-.783 2.339h4.849q-.022-1.451-.61-2.264-.575-.822-1.739-.823M46.909 1.289l2.87.303v16.047h-2.544l-.174-1.353q-.532.758-1.337 1.223-.805.455-1.87.455-1.457 0-2.414-.758-.945-.758-1.413-2.122-.457-1.376-.457-3.194 0-1.755.544-3.12.543-1.363 1.565-2.143 1.033-.78 2.447-.78.848 0 1.543.293.696.292 1.24.866zM44.897 7.98q-1.087 0-1.717.943-.62.93-.62 2.977 0 1.44.26 2.307.262.855.74 1.234.48.38 1.13.38.72 0 1.262-.423.555-.433.957-1.072v-5.22a3.1 3.1 0 0 0-.903-.822 2.06 2.06 0 0 0-1.109-.304M36.382 14.618q0 .66.196.964.195.293.63.444l-.62 1.917q-.922-.098-1.576-.455a2.43 2.43 0 0 1-.989-1.094q-.652.79-1.653 1.18-.99.39-2.076.39-1.761 0-2.794-.996t-1.033-2.588q0-1.83 1.435-2.815 1.446-.997 4.088-.996h1.609V9.95q0-1.018-.63-1.472-.63-.466-1.816-.466-.555 0-1.392.152-.826.14-1.707.444l-.685-1.96a12.4 12.4 0 0 1 2.207-.607q1.12-.195 2.034-.195 2.424 0 3.598 1.029 1.174 1.018 1.174 2.891zm-5.153 1.278q.652 0 1.316-.368.673-.368 1.054-1.029v-2.23h-1.13q-1.599 0-2.316.508-.707.51-.707 1.44 0 .802.457 1.246.456.433 1.326.433"
        fill="currentColor"
      />
      <path
        d="m15.473 20-2.261-1.029L22.41 0l2.24 1.05zM3.805 8.554q.805 0 1.392.325.588.326 1.043.758.469.434.892.758.435.325.935.325.63 0 1.098-.466.478-.476.913-1.288l1.707.801a10.3 10.3 0 0 1-.935 1.592q-.51.714-1.207 1.159-.695.432-1.663.433-.772 0-1.359-.325a5.5 5.5 0 0 1-1.044-.758 10 10 0 0 0-.913-.758 1.58 1.58 0 0 0-.946-.325q-.652 0-1.12.476-.466.477-.891 1.257L0 11.738q.413-.812.913-1.538.51-.736 1.207-1.19.707-.456 1.685-.456"
        className="fill-rose-600"
      />
    </svg>
  )
}
