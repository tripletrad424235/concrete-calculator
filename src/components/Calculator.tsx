import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Ruler, Box } from 'lucide-react';

interface CalculationResult {
  volume: number;
  cement: number;
  sand: number;
  aggregate: number;
  water: number;
}

export default function Calculator() {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateMaterials = () => {
    const volume = (length * width * depth) / 1000; // Convert to cubic meters
    
    // Standard mix ratio 1:2:4
    const cement = volume * 350; // kg per cubic meter
    const sand = volume * 700; // kg (2 parts)
    const aggregate = volume * 1400; // kg (4 parts)
    const water = cement * 0.45; // Water-cement ratio 0.45

    setResult({
      volume,
      cement,
      sand,
      aggregate,
      water
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <CalculatorIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Concrete Calculator</h1>
          </div>
          <p className="mt-2 opacity-90">Calculate concrete volume and materials needed for your construction project</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Ruler className="w-4 h-4" />
                Length (mm)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter length"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Ruler className="w-4 h-4" />
                Width (mm)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter width"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Box className="w-4 h-4" />
                Depth (mm)
              </label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter depth"
              />
            </div>
          </div>
          
          <button
            onClick={calculateMaterials}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Calculate Materials
          </button>
          
          {result && (
            <div className="mt-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Results</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResultCard
                  title="Volume"
                  value={result.volume.toFixed(2)}
                  unit="m³"
                />
                <ResultCard
                  title="Cement"
                  value={result.cement.toFixed(2)}
                  unit="kg"
                />
                <ResultCard
                  title="Sand"
                  value={result.sand.toFixed(2)}
                  unit="kg"
                />
                <ResultCard
                  title="Aggregate"
                  value={result.aggregate.toFixed(2)}
                  unit="kg"
                />
                <ResultCard
                  title="Water"
                  value={result.water.toFixed(2)}
                  unit="L"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, value, unit }: { title: string; value: string; unit: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-2xl font-semibold text-gray-900">
        {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
      </p>
    </div>
  );
}