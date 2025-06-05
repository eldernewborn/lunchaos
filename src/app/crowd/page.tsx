"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CrowdPage() {
  const [cafes, setCafes] = useState<{ name: string; busy: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/cafes-busy')
      .then(res => res.json())
      .then(data => {
        setCafes(data.cafes || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load cafes');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/" className="inline-block mb-6">
          <button className="bg-primary-600 text-white px-4 py-2 rounded">← Back to Home</button>
        </Link>
      </div>
      <div className="relative bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Table on the left */}
            <div>
              <div className="bg-white/80 rounded-2xl shadow p-6 overflow-x-auto max-w-md mx-auto flex flex-col justify-center" style={{ height: '500px' }}>
                <table className="w-full bg-white border border-gray-200 h-full text-gray-900">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b font-bold text-lg bg-white">Cafe</th>
                      <th className="py-2 px-4 border-b font-bold text-lg bg-white">Busy Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr><td colSpan={2} className="py-4 text-center">Loading...</td></tr>
                    )}
                    {error && (
                      <tr><td colSpan={2} className="py-4 text-center text-red-500">{error}</td></tr>
                    )}
                    {!loading && !error && cafes.map((cafe, i) => {
                      // Normalize busy score for bar width (50-110 maps to 0-100%)
                      const percent = ((cafe.busy - 50) / 60) * 100;
                      return (
                        <tr key={i}>
                          <td className="py-2 px-4 border-b">{cafe.name}</td>
                          <td className="py-2 px-4 border-b text-center">
                            <div className="w-full h-5 bg-gray-200 rounded-full flex items-center">
                              <div
                                className="h-5 rounded-full bg-primary-500 transition-all duration-300"
                                style={{ width: `${percent}%`, minWidth: 8 }}
                              />
                              <span className="ml-2 text-xs text-gray-700">{cafe.busy}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Hero Box on the right */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-900 mb-6 flex flex-col justify-center items-center" style={{ height: '500px' }}>
                <h1 className="text-xl font-semibold mb-4 w-full text-left">Crowd Insights</h1>
                <div className="w-full flex justify-center mb-6">
                  <div className="w-96 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-5xl">
                    <span>map</span>
                  </div>
                </div>
                <p className="text-lg mb-4">See real-time crowd levels and plan your visit with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
