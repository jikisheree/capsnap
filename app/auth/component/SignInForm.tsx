import { login } from "../actions/index";

export default function SigninForm() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        required
      />
      <button
        formAction={login}
        className="w-full p-3 rounded-md text-white btn btn-secondary hover:bg-primary focus:outline-none"
      >
        Log in
      </button>
    </form>
  );
}
