import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroLanding = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/80" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-gray-200/10 border border-yellow-400/30">
          <span className="h-2 w-2 rounded-full bg-yellow-300 animate-pulse" />
          <span className="text-yellow-200 text-sm">AI-powered legal & tax co-pilot</span>
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-gray-200">
            ABC – AnyBody Can Consult
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-gray-200">
          Analyse and submit income details for review. Get intelligent suggestions and chat with your golden cloud assistant.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={onGetStarted}
            className="px-6 py-3 rounded-2xl text-gray-900 font-semibold bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-200 shadow-[10px_10px_20px_#111827,-10px_-10px_20px_#374151] hover:brightness-110 transition"
          >
            Sign in / Sign up
          </button>
          <a
            href="#modules"
            className="px-6 py-3 rounded-2xl font-medium border border-gray-500/60 text-gray-200 bg-gradient-to-br from-gray-700 to-gray-800 shadow-[10px_10px_20px_#111827,-10px_-10px_20px_#374151] hover:brightness-110 transition"
          >
            Explore Features
          </a>
        </div>

        <p className="mt-8 text-xs text-gray-300 max-w-xl">
          We extract basic and relevant information from your income tax profile for enhanced experience.
        </p>
      </div>
    </section>
  );
};

export default HeroLanding;
