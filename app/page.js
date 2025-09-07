
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <navbar className="w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="float-left text-4xl font-bold text-black">Musical</h1>
        <button className="float-right px-8 py-3 rounded-full bg-[#9D8CF0] text-white font-semibold text-lg shadow-md hover:bg-[#8a77e8] hover:shadow-lg transition-all duration-200">
          Login
        </button>
      </navbar>
      <section className="w-full bg-gradient-to-br from-[#fff7ed] to-[#ede9fe] py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <h1>
            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Unleash Your Creativity
            </span>
            <br />
            <span className="text-4xl text-gray-700">
              for applications related to music.
            </span>
          </h1>
          <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <span className="text-gray-500">Music visualizer here</span>
          </div>
        </div>
      </section>

      
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Stuck, use our idea generator</h2>
        </div>
      </section>

      
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Rewards</h2>

        </div>
      </section>
    </div>
  );
}