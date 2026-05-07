import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <section className="bg-neutral-800 text-white min-h-screen">
        <div className="container mx-auto px-2">
          <div className="min-h-screen flex justify-center items-center">
            <div>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold max-w-xl mb-6">
                Welcome to Draftly —
                <span className="text-blue-400">Your Creative Playground</span>
              </h1>

              <p className="max-w-xl text-lg mb-8">
                Unleash your thoughts, tell your story, and publish ideas that
                spark conversations. From tech deep-dives to personal essays,
                Draftly is where every voice finds its place.
              </p>

              <div className="grid gap-2 grid-cols-2">
                <button
                  className="bg-blue-400 py-2 px-4 rounded-full text-lg"
                  onClick={() => navigate("/blogs/create")}
                >
                  Start writing now
                </button>
                <button
                  className="bg-white py-2 px-4 rounded-full text-lg text-black"
                  onClick={() => navigate("/blogs")}
                >
                  Explore top blogs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
