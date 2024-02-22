import Link from "next/link";

export default async function Home() {
  return (
    <main className=" min-h-screen">
      <div className="flex justify-between mx-7">
        <h1 className="mt-7 text-7xl bg-gradient-to-r from-white to-cyan-400 text-transparent bg-clip-text font-bold">
          CapSnap
        </h1>
        <button
          type="button"
          className=" font-bold m-8 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-xl text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <Link href="/auth/signin">GET STRATED</Link>
        </button>
      </div>
      <div className=" flex flex-col items-center justify-between p-56">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      </div>
    </main>
  );
}
