import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Health Tracker</h1>
            <p className="py-6">
              This is a simple health tracker that I am making to hopefully
              track my own health. This is a work in progress and more features
              will be added later.
            </p>
            <Link className="btn btn-primary" href={"./heart-beat-tracker"}>Click here to get started</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
