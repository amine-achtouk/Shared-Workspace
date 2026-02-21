import { useState } from 'react'


function App() {

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-8 shadow-2xl transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-600 underline">
          Tailwind is Working!
        </h1>
        <p className="mt-4 text-gray-500">
          If you see a centered card with a blue underlined heading, you're good to go.
        </p>
        <button className="mt-6 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
          Hover Me
        </button>
      </div>
    </div>
    </>
  )
}

export default App
