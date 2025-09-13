
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <nav className="w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="float-left text-4xl font-bold text-black">Musical</h1>
        <button className="float-right px-8 py-3 rounded-full bg-[#9D8CF0] text-white font-semibold text-lg shadow-md hover:bg-[#8a77e8] hover:shadow-lg transition-all duration-200">
          Login
        </button>
      </nav>
      <section className="w-full bg-gradient-to-br from-[#fff7ed] to-[#ede9fe] py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <h1>
            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Unleash Your Creativity
            </span>
            <br />
            <span className="text-4xl text-gray-700">
              and make applications based on musical themes.
            </span>
          </h1>
          <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <span className="text-gray-500">Music visualizer here</span>
          </div>
        </div>
      </section>


      {/*<section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Stuck, use our idea generator</h2>
        </div>
      </section>*/}


      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <h3 className="text-2xl text-black font-semibold mb-2">

              </h3>
              <p className="text-lg"></p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <h3 className="text-2xl text-black font-semibold mb-2">

              </h3>
              <p className="text-lg"></p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <h3 className="text-2xl text-black font-semibold mb-2">

              </h3>
              <p className="text-lg"></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}