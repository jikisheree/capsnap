import FormCard from "../../components/FormCard";
import Link from "next/link";
import SigninForm from "../component/SignInForm";

export default function Login() {
  return (
    <FormCard signType="Sign In">
      <div className="py-32 w-1/2 mr-auto p-5 rounded-l-lg opacity-60 bg-gradient-to-r from-cyan to-blue-500 hover:from-blue-500 hover:to-cyan">
        <h1 className="pl-11 font-mono text-7xl bg-clip-text font-bold">
          <Link href="/">CapSnap</Link>
        </h1>
        <div className="text-center mr-5 mt-5">
          <p>Only store admins are allowed</p>
        </div>
      </div>
      <div className=" w-1/2 ml-auto bg-white p-5 rounded-r-lg py-32">
        <h1 className=" text-black text-center pb-3 text-xl font-bold">
          <br></br>
          Sign In
        </h1>
        <SigninForm />
      </div>
    </FormCard>
  );
}
