'use client';
import React from "react";

export default function Home() {
  return (
    <>
      <header className="w-full p-4 sm:p-6 bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">Musical</h1>
        </div>
      </header>

      <section className="w-full bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center px-4 sm:px-8 relative z-10">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
              Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">Musical</span> Creativity
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light">
              Build amazing applications with musical themes and unlock epic rewards!
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-transform shadow-lg">
              Start Creating / Submit Your Project
            </button>
          </div>
          <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl"></div>
            <div className="text-center text-white z-10">
              <div className="text-6xl mb-4 animate-pulse"></div>
              <span className="text-lg font-semibold">Interactive Music Visualizer here</span>
            </div>
          </div>
        </div>
      </section>

      <section id="planning" className="w-full bg-gradient-to-br from-slate-100 to-blue-100 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Plan Your Musical Journey</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Sketch your ideas and build step-by-step like a professional storyboard for your music apps!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-purple-400 hover:scale-105 transition-all duration-300 group">
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-bounce"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Brainstorm Ideas</h3>
                <p className="text-gray-600">Jot down your musical app concepts and themes.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-blue-400 hover:scale-105 transition-all duration-300 group">
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-bounce"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sketch Wireframes</h3>
                <p className="text-gray-600">Draw rough layouts for your app&apos;s interface.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-green-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-green-400 hover:scale-105 transition-all duration-300 group">
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-bounce"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Add Music Elements</h3>
                <p className="text-gray-600">Integrate audio features and visualizers.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-orange-400 hover:scale-105 transition-all duration-300 group">
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-bounce"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Launch & Iterate</h3>
                <p className="text-gray-600">Deploy your app and refine based on feedback.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-dashed border-gray-300 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Best Projects So Far</h3>
            <p className="text-gray-600 mb-8 text-center">Showcase of amazing musical projects built by our community!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-200 to-blue-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-300">
                <div className="text-center">
                  <div className="text-3xl mb-2"></div>
                  <h4 className="font-bold text-gray-800 mb-1">Project 1</h4>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-green-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-300">
                <div className="text-center">
                  <div className="text-3xl mb-2"></div>
                  <h4 className="font-bold text-gray-800 mb-1">Project 2</h4>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-200 to-yellow-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-green-300">
                <div className="text-center">
                  <div className="text-3xl mb-2"></div>
                  <h4 className="font-bold text-gray-800 mb-1">Project 3</h4>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-200 to-orange-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-yellow-300">
                <div className="text-center">
                  <div className="text-3xl mb-2"></div>
                  <h4 className="font-bold text-gray-800 mb-1">Project 4</h4>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-200 to-red-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-300">
                <div className="text-center">
                  <div className="text-3xl mb-2"></div>
                  <h4 className="font-bold text-gray-800 mb-1">Project 5</h4>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-200 to-pink-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-red-300">
                <div className="text-center">
                  <div className="text-3xl mb-2"></div>
                  <h4 className="font-bold text-gray-800 mb-1">Project 6</h4>
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">How to Submit Your Project</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-2 text-gray-800">1</div>
                  <h5 className="font-semibold text-gray-800 mb-1">Build Your App</h5>
                  <p className="text-xs text-gray-600">Create an amazing musical application</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-2 text-gray-800">2</div>
                  <h5 className="font-semibold text-gray-800 mb-1">Deploy Online</h5>
                  <p className="text-xs text-gray-600">Host your project on Vercel, Netlify, or similar</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-2 text-gray-800">3</div>
                  <h5 className="font-semibold text-gray-800 mb-1">Submit Details</h5>
                  <p className="text-xs text-gray-600">Share your project link and description</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="rewards" className="w-full bg-white py-8 sm:py-16">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">🏆 Time-Based Rewards</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
            The more hours you spend building, the better rewards you unlock!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💿</div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 inline-block">5 HOURS</div>
                <h3 className="text-lg sm:text-2xl text-black font-semibold mb-2">Music Album ($25)</h3>
                <p className="text-sm sm:text-lg text-gray-600">Any music album of your choice - digital or physical copy!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:border-purple-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎤</div>
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 inline-block">10 HOURS</div>
                <h3 className="text-lg sm:text-2xl text-black font-semibold mb-2">$50 Microphone</h3>
                <p className="text-sm sm:text-lg text-gray-600">Professional quality microphone to record your music creations!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-orange-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-5xl mb-4">🎧</div>
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">20 HOURS</div>
                <h3 className="text-2xl text-black font-semibold mb-2">$100 Headphones</h3>
                <p className="text-lg text-gray-600">Premium headphones for the best audio experience while coding!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:border-green-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔊</div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 inline-block">30 HOURS</div>
                <h3 className="text-lg sm:text-2xl text-black font-semibold mb-2">Speaker/Soundbox ($150)</h3>
                <p className="text-sm sm:text-lg text-gray-600">Immerse yourself in sound with this powerful speaker.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎸</div>
                <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 inline-block">40 HOURS</div>
                <h3 className="text-lg sm:text-2xl text-black font-semibold mb-2">Basic Instrument</h3>
                <p className="text-sm sm:text-lg text-gray-600">Any musical instrument of your choice up to $200!</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:border-red-400 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎹</div>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 inline-block">50 HOURS</div>
                <h3 className="text-lg sm:text-2xl text-black font-semibold mb-2">Advanced Instrument</h3>
                <p className="text-sm sm:text-lg text-gray-600">Any high-end musical instrument of your choice up to $250!</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}