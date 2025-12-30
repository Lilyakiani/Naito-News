import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import Particles from '../Backgrounds/Particles';
import { Footer } from '../Footer';

export default function NewsLetter() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '600px',
        position: 'relative',
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Particles
          particleColors={['#ffffff', '##6b6b6b']}
          particleCount={200}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing
              velit quis. Duis tempor incididunt dolore.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border border-white/10 bg-white/5 px-3.5 py-2 text-base text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Weekly articles
              </dt>
              <dd className="mt-2 text-base text-gray-400">
                Non laboris consequat cupidatat laborum magna. Eiusmod non
                irure.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                No spam
              </dt>
              <dd className="mt-2 text-base text-gray-400">
                Officia excepteur ullamco ut sint duis proident non adipisicing.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* blur Effect*/}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-0 -translate-x-1/2 blur-3xl xl:-top-6 opacity-30"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#000000] to-[#808080]"
        />
      </div>
      <Footer />
    </div>
  );
}
