import Image from 'next/image';
import Link from 'next/link';
import notfound from './404.svg';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center  px-6 py-12">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <div className="relative mb-8 w-full max-w-75 md:max-w-112.5 ">
          <Image
            priority
            src={notfound}
            alt="404 Error - Page Not Found"
            className="h-auto w-full"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Oops! Page Not Found!
            <span className="inline-block animate-bounce">🤖</span>
          </h1>

          <p className="mx-auto max-w-lg text-lg text-slate-600 dark:text-slate-400">
            We couldn&apos;t find the page you are looking for
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:bg-indigo-700 hover:shadow-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-95 dark:shadow-none"
          >
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
