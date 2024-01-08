import Link from 'next/link'

export const ErrorPage = ({ error = {status: 404, message: 'Page not found'} }) => {
    return (
        <main className="w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">{error.status || 503}</h1>
            <div className="bg-orange-600 px-2 text-sm rounded rotate-12 absolute">
                {error.statusText}
            </div>
            <button className="mt-5">
              <Link href="/" className="relative inline-block text-sm font-medium text-orange-600 group active:text-orange-600 focus:outline-none focus:ring rounded-lg">
                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-orange-600 group-hover:translate-y-0 group-hover:translate-x-0 rounded-lg"></span>
                <span className="relative block px-8 py-3 bg-secondary border border-current rounded-lg">Go Home</span>
              </Link>
            </button>
        </main>
    )
}