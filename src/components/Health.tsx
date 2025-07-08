import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Weight, 
  TrendingUp,
  TrendingDown,
  Plus,
  AlertTriangle,
  CheckCircle,
  BarChart2,
  LineChart
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HealthRecord {
  id: string;
  type: 'bp' | 'sugar' | 'weight' | 'temperature' | 'oxygen';
  value: string;
  numericValue: number;
  timestamp: Date;
  normal: boolean;
}

const Health: React.FC = () => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      type: 'bp',
      value: '120/80',
      numericValue: 120,
      timestamp: new Date(),
      normal: true
    },
    {
      id: '2',
      type: 'sugar',
      value: '110 mg/dL',
      numericValue: 110,
      timestamp: new Date(Date.now() - 3600000),
      normal: true
    },
    {
      id: '3',
      type: 'weight',
      value: '68 kg',
      numericValue: 68,
      timestamp: new Date(Date.now() - 86400000),
      normal: true
    },
    {
      id: '4',
      type: 'bp',
      value: '118/78',
      numericValue: 118,
      timestamp: new Date(Date.now() - 2 * 86400000),
      normal: true
    },
    {
      id: '5',
      type: 'sugar',
      value: '105 mg/dL',
      numericValue: 105,
      timestamp: new Date(Date.now() - 3 * 86400000),
      normal: true
    },
    {
      id: '6',
      type: 'weight',
      value: '67.5 kg',
      numericValue: 67.5,
      timestamp: new Date(Date.now() - 4 * 86400000),
      normal: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: 'bp' as const,
    value: '',
    numericValue: 0
  });
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [selectedMetric, setSelectedMetric] = useState<'bp' | 'sugar' | 'weight'>('bp');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  const addHealthRecord = () => {
    if (newRecord.value) {
      // Extract numeric value from the string
      let numericValue = 0;
      if (newRecord.type === 'bp') {
        numericValue = parseFloat(newRecord.value.split('/')[0]);
      } else {
        numericValue = parseFloat(newRecord.value.replace(/[^0-9.]/g, ''));
      }

      const record: HealthRecord = {
        id: Date.now().toString(),
        ...newRecord,
        numericValue,
        timestamp: new Date(),
        normal: true // In real app, this would be calculated based on normal ranges
      };
      setHealthRecords(prev => [record, ...prev]);
      setNewRecord({ type: 'bp', value: '', numericValue: 0 });
      setShowAddForm(false);
    }
  };

  const getHealthIcon = (type: string) => {
    switch (type) {
      case 'bp': return Heart;
      case 'sugar': return Droplets;
      case 'weight': return Weight;
      case 'temperature': return Thermometer;
      case 'oxygen': return Activity;
      default: return Activity;
    }
  };

  const getHealthLabel = (type: string) => {
    switch (type) {
      case 'bp': return 'Blood Pressure';
      case 'sugar': return 'Blood Sugar';
      case 'weight': return 'Weight';
      case 'temperature': return 'Temperature';
      case 'oxygen': return 'Oxygen Level';
      default: return 'Health Reading';
    }
  };

  const todayRecords = healthRecords.filter(record => 
    record.timestamp.toDateString() === new Date().toDateString()
  );

  const healthTips = [
    "Remember to take your medicines on time",
    "Stay hydrated - drink 8-10 glasses of water daily",
    "Take a short walk after meals",
    "Get 7-8 hours of sleep each night",
    "Eat fresh fruits and vegetables daily"
  ];

  // Filter records based on selected time range
  const getFilteredRecords = () => {
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeRange) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'all':
        return healthRecords.filter(r => r.type === selectedMetric);
    }
    
    return healthRecords.filter(r => 
      r.type === selectedMetric && new Date(r.timestamp) >= cutoffDate
    );
  };

  // Prepare chart data
  const prepareChartData = () => {
    const filteredRecords = getFilteredRecords()
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    const labels = filteredRecords.map(record => 
      record.timestamp.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    );
    
    const data = filteredRecords.map(record => record.numericValue);
    
    let borderColor, backgroundColor;
    switch (selectedMetric) {
      case 'bp':
        borderColor = 'rgb(220, 38, 38)';
        backgroundColor = 'rgba(220, 38, 38, 0.2)';
        break;
      case 'sugar':
        borderColor = 'rgb(37, 99, 235)';
        backgroundColor = 'rgba(37, 99, 235, 0.2)';
        break;
      case 'weight':
        borderColor = 'rgb(22, 163, 74)';
        backgroundColor = 'rgba(22, 163, 74, 0.2)';
        break;
      default:
        borderColor = 'rgb(234, 88, 12)';
        backgroundColor = 'rgba(234, 88, 12, 0.2)';
    }
    
    return {
      labels,
      datasets: [
        {
          label: getHealthLabel(selectedMetric),
          data,
          borderColor,
          backgroundColor,
          tension: 0.1,
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${getHealthLabel(selectedMetric)} Over Time`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: selectedMetric === 'bp' ? 'Systolic (mmHg)' : 
                selectedMetric === 'sugar' ? 'mg/dL' : 'kg'
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">Health Dashboard</h2>
        <p className="text-xl">Keep track of your health and wellness</p>
      </div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">120/80</h3>
          <p className="text-gray-600 text-lg">Blood Pressure</p>
          <span className="text-green-600 text-sm font-medium">Normal</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Droplets className="h-8 w-8 text-blue-600" />
            </div>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">110</h3>
          <p className="text-gray-600 text-lg">Blood Sugar</p>
          <span className="text-green-600 text-sm font-medium">Normal</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Weight className="h-8 w-8 text-green-600" />
            </div>
            <TrendingDown className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">68 kg</h3>
          <p className="text-gray-600 text-lg">Weight</p>
          <span className="text-green-600 text-sm font-medium">Stable</span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <div className="bg-orange-100 p-3 rounded-full mb-4">
              <Plus className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800">Add Reading</p>
          </button>
        </div>
      </div>

      {/* Health Metrics Visualization */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Health Trends</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg ${chartType === 'line' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              title="Line Chart"
            >
              <LineChart className="h-5 w-5" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              title="Bar Chart"
            >
              <BarChart2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMetric('bp')}
              className={`px-4 py-2 rounded-full ${selectedMetric === 'bp' ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}
            >
              Blood Pressure
            </button>
            <button
              onClick={() => setSelectedMetric('sugar')}
              className={`px-4 py-2 rounded-full ${selectedMetric === 'sugar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            >
              Blood Sugar
            </button>
            <button
              onClick={() => setSelectedMetric('weight')}
              className={`px-4 py-2 rounded-full ${selectedMetric === 'weight' ? 'bg-green-100 text-green-600' : 'bg-gray-100'}`}
            >
              Weight
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-full ${timeRange === 'week' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-full ${timeRange === 'month' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-4 py-2 rounded-full ${timeRange === 'all' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
            >
              All Data
            </button>
          </div>
        </div>

        <div className="h-80">
          {chartType === 'line' ? (
            <Line data={prepareChartData()} options={chartOptions} />
          ) : (
            <Bar data={prepareChartData()} options={chartOptions} />
          )}
        </div>
      </div>

      {/* Add Health Record Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Health Reading</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Type</label>
              <select
                value={newRecord.type}
                onChange={(e) => setNewRecord(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="bp">Blood Pressure</option>
                <option value="sugar">Blood Sugar</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
                <option value="oxygen">Oxygen Level</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Reading</label>
              <input
                type="text"
                value={newRecord.value}
                onChange={(e) => setNewRecord(prev => ({ ...prev, value: e.target.value }))}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={newRecord.type === 'bp' ? 'e.g. 120/80' : newRecord.type === 'sugar' ? 'e.g. 110 mg/dL' : 'e.g. 68 kg'}
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={addHealthRecord}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Add Reading
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Today's Readings */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Today's Readings</h3>
        {todayRecords.length > 0 ? (
          <div className="space-y-4">
            {todayRecords.map((record) => {
              const IconComponent = getHealthIcon(record.type);
              return (
                <div key={record.id} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800">{getHealthLabel(record.type)}</h4>
                    <p className="text-gray-600 text-lg">{record.value}</p>
                    <p className="text-gray-500 text-sm">
                      {record.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {record.normal ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      record.normal ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {record.normal ? 'Normal' : 'Check'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No readings recorded today</p>
            <p className="text-gray-400">Add your first health reading above</p>
          </div>
        )}
      </div>

      {/* Health Tips */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Daily Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-lg text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <div>
            <h3 className="text-xl font-bold text-red-700">Health Emergency?</h3>
            <p className="text-red-600 text-lg">If you feel unwell or have concerning symptoms, contact your doctor or emergency services immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;