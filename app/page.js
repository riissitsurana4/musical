
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="w-full p-5 bg-white shadow-md rounded-lg">
        <h1 className="float-left text-4xl font-bold text-black">Musical</h1>
        <button className="float-right px-8 py-3 rounded-full bg-[#9D8CF0] text-white font-semibold text-lg shadow-md hover:bg-[#8a77e8] hover:shadow-lg transition-all duration-200">
          Login
        </button>
      </header>
      <section className="w-full bg-gradient-to-br from-[#fff7ed] to-[#ede9fe] py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Unleash Your Creativity
            </span>

            <p className="mt-2 text-4xl text-gray-700">
              and make applications based on musical themes.
            </p>

            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              🎵 Start Building
            </button>
          </div>
          <div className="w-full h-64 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <span className="text-gray-500">Music visualizer here</span>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">🏆 Time-Based Rewards</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            The more hours you spend building, the better rewards you unlock!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">💿</div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">5 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">Music Album(25$)</h3>
                <p className="text-lg text-gray-600">Any music album of your choice - digital or physical copy!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">🎤</div>
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">10 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">$50 Microphone</h3>
                <p className="text-lg text-gray-600">Professional quality microphone to record your music creations!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">🎧</div>
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">20 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">Premium Headphones(100$)</h3>
                <p className="text-lg text-gray-600">Experience music like never before with high-quality headphones.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-green-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">🔊</div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">30 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">Speaker/Soundbox(150$)</h3>
                <p className="text-lg text-gray-600">Immerse yourself in sound with this powerful speaker.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">🎸</div>
                <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">40 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">Basic Instrument</h3>
                <p className="text-lg text-gray-600">Any musical instrument of your choice up to $200!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-red-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">🎹</div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">50 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">Advanced Instrument</h3>
                <p className="text-lg text-gray-600">Any high-end musical instrument of your choice up to $250!</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      
    </div>
  );
}