'use client'

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">
          🌳 BosqueGracias
        </h1>
        <p className="text-lg text-stone-600 mb-8">
          Biofílico-inspired digital art marketplace on Base
        </p>
        <p className="text-sm text-stone-500">
          Project structure created successfully!
          <br />
          See the Configure tab in Ohara to view all components.
        </p>
      </div>
    </div>
  );
}
