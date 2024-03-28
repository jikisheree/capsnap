import Link from "next/link";

export default function ErrorPage() {
  return (
  <div className="h-screen flex items-center justify-center">
    <h1 className=" font-bold">Sorry, something went wrong</h1>
    <span className="p-3"></span>
    <Link href="auth/signin"><button className="btn btn-primary text-white">Try Again</button></Link>
</div>
  )
}
