import React, { useState } from 'react';
import { TrendingUp, Package, AlertTriangle, Calendar, MapPin, Sparkles } from 'lucide-react';

function StockIq() {
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [season, setSeason] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated AI forecasting function
  const generateForecast = () => {
    setLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Simulated ML-based calculations
      const baselineDemand = Math.floor(Math.random() * 500) + 200;
      const seasonMultiplier = season === 'festival' ? 2.5 : season === 'summer' ? 1.3 : season === 'winter' ? 1.5 : season === 'monsoon' ? 0.8 : 1.0;
      const locationMultiplier = location === 'urban' ? 1.4 : location === 'suburban' ? 1.1 : 0.9;
      
      const predictedDemand = Math.floor(baselineDemand * seasonMultiplier * locationMultiplier);
      const optimalStock = Math.floor(predictedDemand * 1.2);
      const currentStockNum = parseInt(currentStock) || 0;
      const stockDiff = optimalStock - currentStockNum;
      
      const status = stockDiff > 100 ? 'understock' : stockDiff < -100 ? 'overstock' : 'optimal';
      
      setForecast({
        predictedDemand,
        optimalStock,
        currentStockNum,
        stockDiff,
        status,
        confidence: Math.floor(Math.random() * 15) + 85,
        trends: [
          { month: 'Jan', demand: Math.floor(predictedDemand * 0.7) },
          { month: 'Feb', demand: Math.floor(predictedDemand * 0.8) },
          { month: 'Mar', demand: Math.floor(predictedDemand * 1.1) },
          { month: 'Apr', demand: predictedDemand }
        ]
      });
      
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (productName && location && season && currentStock) {
      generateForecast();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center text-white mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles size={32} />
            <h1 className="text-4xl font-bold">AI Sales Forecasting & Demand Planner</h1>
          </div>
          <p className="text-purple-100">Smart inventory management powered by machine learning</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Package size={24} />
              Product Information
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Winter Jacket"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-purple-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin size={16} />
                  Location Type
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-purple-500 focus:outline-none transition"
                >
                  <option value="">Select location</option>
                  <option value="urban">Urban Area</option>
                  <option value="suburban">Suburban Area</option>
                  <option value="rural">Rural Area</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar size={16} />
                  Season / Period
                </label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-purple-500 focus:outline-none transition"
                >
                  <option value="">Select season</option>
                  <option value="festival">Festival Season</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                  <option value="monsoon">Monsoon</option>
                  <option value="regular">Regular Period</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Current Stock Level</label>
                <input
                  type="number"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(e.target.value)}
                  placeholder="e.g., 500"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:border-purple-500 focus:outline-none transition"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-4 rounded-lg text-base font-semibold text-white transition ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg'
                }`}
              >
                {loading ? 'Analyzing with AI...' : 'Generate Forecast'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            {!forecast ? (
              <div className="text-center py-16 text-gray-400">
                <TrendingUp size={64} className="mx-auto mb-5 opacity-30" />
                <h3 className="text-xl font-bold mb-2">AI Forecast Results</h3>
                <p>Fill in the product details and click Generate Forecast to see AI-powered predictions</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp size={24} />
                  Forecast Results
                </h2>

                {/* Status Alert */}
                <div className={`p-4 rounded-lg mb-5 border-2 ${
                  forecast.status === 'understock' 
                    ? 'bg-yellow-100 border-yellow-400' 
                    : forecast.status === 'overstock' 
                    ? 'bg-red-100 border-red-400' 
                    : 'bg-green-100 border-green-400'
                }`}>
                  <div className="flex items-center gap-3 font-semibold">
                    <AlertTriangle size={20} />
                    {forecast.status === 'understock' 
                      ? 'Understock Alert' 
                      : forecast.status === 'overstock' 
                      ? 'Overstock Alert' 
                      : 'Optimal Stock Level'}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-5 bg-gray-100 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Predicted Demand</div>
                    <div className="text-3xl font-bold text-purple-600">{forecast.predictedDemand}</div>
                    <div className="text-xs text-gray-600">units/month</div>
                  </div>
                  
                  <div className="p-5 bg-gray-100 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Optimal Stock</div>
                    <div className="text-3xl font-bold text-green-600">{forecast.optimalStock}</div>
                    <div className="text-xs text-gray-600">units</div>
                  </div>
                  
                  <div className="p-5 bg-gray-100 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Current Stock</div>
                    <div className="text-3xl font-bold text-gray-800">{forecast.currentStockNum}</div>
                    <div className="text-xs text-gray-600">units</div>
                  </div>
                  
                  <div className="p-5 bg-gray-100 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">AI Confidence</div>
                    <div className="text-3xl font-bold text-purple-700">{forecast.confidence}%</div>
                    <div className="text-xs text-gray-600">accuracy</div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-5 bg-gray-50 rounded-lg mb-6">
                  <h3 className="font-bold text-lg mb-2">Recommendation</h3>
                  <p className="text-gray-700">
                    {forecast.stockDiff > 0 ? (
                      <span>Order <strong className="text-purple-700">{Math.abs(forecast.stockDiff)} more units</strong> to meet predicted demand and avoid stockouts.</span>
                    ) : forecast.stockDiff < 0 ? (
                      <span>You have <strong className="text-red-600">{Math.abs(forecast.stockDiff)} excess units</strong>. Consider promotions to clear inventory.</span>
                    ) : (
                      <span>Your stock level is optimal for the predicted demand.</span>
                    )}
                  </p>
                </div>

                {/* Trend Preview */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Demand Trend (Next 4 Months)</h3>
                  <div className="flex gap-3 items-end h-32">
                    {forecast.trends.map((trend, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div 
                          className="bg-gradient-to-t from-purple-600 to-purple-800 rounded-t mx-auto"
                          style={{ height: `${(trend.demand / forecast.predictedDemand) * 100}px` }}
                        ></div>
                        <div className="text-xs font-semibold mt-2">{trend.month}</div>
                        <div className="text-xs text-gray-600">{trend.demand}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-5 bg-white bg-opacity-10 rounded-xl text-white text-center">
          <p className="text-sm">
            Powered by Machine Learning • Pattern Recognition • Historical Data Analysis
          </p>
        </div>
      </div>
    </div>
  );
}

export default StockIq; 