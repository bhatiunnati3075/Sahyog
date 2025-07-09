import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';

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
  status: 'normal' | 'stable' | 'warning' | 'critical';
}

const Health: React.FC = () => {
  const { t } = useTranslation();
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      type: 'bp',
      value: '120/80',
      numericValue: 120,
      timestamp: new Date(),
      status: 'normal'
    },
    {
      id: '2',
      type: 'sugar',
      value: '110',
      numericValue: 110,
      timestamp: new Date(Date.now() - 3600000),
      status: 'normal'
    },
    {
      id: '3',
      type: 'weight',
      value: '68',
      numericValue: 68,
      timestamp: new Date(Date.now() - 86400000),
      status: 'stable'
    },
    {
      id: '4',
      type: 'bp',
      value: '118/78',
      numericValue: 118,
      timestamp: new Date(Date.now() - 2 * 86400000),
      status: 'normal'
    },
    {
      id: '5',
      type: 'sugar',
      value: '105',
      numericValue: 105,
      timestamp: new Date(Date.now() - 3 * 86400000),
      status: 'normal'
    },
    {
      id: '6',
      type: 'weight',
      value: '67.5',
      numericValue: 67.5,
      timestamp: new Date(Date.now() - 4 * 86400000),
      status: 'stable'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: 'bp' as const,
    value: '',
    numericValue: 0
  });
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [selectedMetric, setSelectedMetric] = useState<'bp' | 'sugar' | 'weight' | 'temperature' | 'oxygen'>('bp');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  const addHealthRecord = () => {
    if (newRecord.value) {
      let numericValue = 0;
      let status: 'normal' | 'stable' | 'warning' | 'critical' = 'normal';
      
      if (newRecord.type === 'bp') {
        const [systolic, diastolic] = newRecord.value.split('/').map(Number);
        numericValue = systolic;
        
        // Simple BP status check
        if (systolic > 140 || diastolic > 90) status = 'warning';
        if (systolic > 180 || diastolic > 120) status = 'critical';
      } else {
        numericValue = parseFloat(newRecord.value.replace(/[^0-9.]/g, ''));
        
        // Simple status checks for other metrics
        if (newRecord.type === 'sugar') {
          if (numericValue > 140) status = 'warning';
          if (numericValue > 200) status = 'critical';
        } else if (newRecord.type === 'weight') {
          status = 'stable'; // Weight is typically considered stable
        }
      }

      const record: HealthRecord = {
        id: Date.now().toString(),
        type: newRecord.type,
        value: formatValue(newRecord.type, newRecord.value),
        numericValue,
        timestamp: new Date(),
        status
      };
      
      setHealthRecords(prev => [record, ...prev]);
      setNewRecord({ type: 'bp', value: '', numericValue: 0 });
      setShowAddForm(false);
    }
  };

  const formatValue = (type: string, value: string): string => {
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    switch (type) {
      case 'bp':
        return value.includes('/') ? value : `${value}/${Math.floor(numValue * 0.8)}`;
      case 'sugar':
        return `${numValue} ${t('healthUnits.mgdL')}`;
      case 'weight':
        return `${numValue} ${t('healthUnits.kg')}`;
      case 'temperature':
        return `${numValue} ${t('healthUnits.celsius')}`;
      case 'oxygen':
        return `${numValue}${t('healthUnits.percent')}`;
      default:
        return value;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'green';
      case 'stable': return 'blue';
      case 'warning': return 'yellow';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const todayRecords = healthRecords.filter(record => 
    record.timestamp.toDateString() === new Date().toDateString()
  );

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
      case 'temperature':
        borderColor = 'rgb(234, 88, 12)';
        backgroundColor = 'rgba(234, 88, 12, 0.2)';
        break;
      case 'oxygen':
        borderColor = 'rgb(168, 85, 247)';
        backgroundColor = 'rgba(168, 85, 247, 0.2)';
        break;
      default:
        borderColor = 'rgb(234, 88, 12)';
        backgroundColor = 'rgba(234, 88, 12, 0.2)';
    }
    
    return {
      labels,
      datasets: [
        {
          label: t(`healthMetrics.${selectedMetric}`),
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
        text: `${t(`healthMetrics.${selectedMetric}`)} ${t('healthChart.overTime')}`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: t(`healthUnits.${selectedMetric === 'bp' ? 'mmHg' : 
                 selectedMetric === 'sugar' ? 'mgdL' : 
                 selectedMetric === 'weight' ? 'kg' :
                 selectedMetric === 'temperature' ? 'celsius' : 'percent'}`)
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
        <h2 className="text-4xl font-bold mb-4">{t('healthDashboard')}</h2>
        <p className="text-xl">{t('Welcome')}</p>
      </div>

      {/* Health Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['bp', 'sugar', 'weight'].map((metric) => {
          const latestRecord = healthRecords
            .filter(r => r.type === metric)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
          
          if (!latestRecord) return null;
          
          const IconComponent = getHealthIcon(metric);
          const statusColor = getStatusColor(latestRecord.status);
          
          return (
            <div key={metric} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-${statusColor}-100 p-3 rounded-full`}>
                  <IconComponent className={`h-8 w-8 text-${statusColor}-600`} />
                </div>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {metric === 'bp' ? latestRecord.value : `${latestRecord.value} ${t(`healthUnits.${metric === 'sugar' ? 'mgdL' : 'kg'}`)}`}
              </h3>
              <p className="text-gray-600 text-lg">{t(`healthMetrics.${metric}`)}</p>
              <span className={`text-${statusColor}-600 text-sm font-medium`}>
                {t(`healthStatus.${latestRecord.status}`)}
              </span>
            </div>
          );
        })}

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex flex-col items-center justify-center w-full h-full hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <div className="bg-orange-100 p-3 rounded-full mb-4">
              <Plus className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-lg font-semibold text-gray-800">{t('addReading')}</p>
          </button>
        </div>
      </div>

      {/* Health Metrics Visualization */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{t('healthTrends')}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-lg ${chartType === 'line' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              title={t('healthChart.lineChart')}
            >
              <LineChart className="h-5 w-5" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              title={t('barChart')}
            >
              <BarChart2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2 flex-wrap">
            {['bp', 'sugar', 'weight', 'temperature', 'oxygen'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric as any)}
                className={`px-4 py-2 rounded-full ${selectedMetric === metric ? 
                  `bg-${getStatusColor('normal')}-100 text-${getStatusColor('normal')}-600` : 
                  'bg-gray-100'}`}
              >
                {t(`healthMetrics.${metric}`)}
              </button>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-full ${timeRange === 'week' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
            >
              {t('week')}
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-full ${timeRange === 'month' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
            >
              {t('month')}
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-4 py-2 rounded-full ${timeRange === 'all' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'}`}
            >
              {t('allData')}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('addHealthReading')}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">{t('type')}</label>
                <select
                  value={newRecord.type}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="bp">{t('healthMetrics.bp')}</option>
                  <option value="sugar">{t('healthMetrics.sugar')}</option>
                  <option value="weight">{t('healthMetrics.weight')}</option>
                  <option value="temperature">{t('healthMetrics.temperature')}</option>
                  <option value="oxygen">{t('healthMetrics.oxygen')}</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">{t('reading')}</label>
                <input
                  type="text"
                  value={newRecord.value}
                  onChange={(e) => setNewRecord(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={t(`healthPlaceholders.${newRecord.type}`)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {t('healthUnits.' + (newRecord.type === 'bp' ? 'mmHg' : 
                     newRecord.type === 'sugar' ? 'mgdL' : 
                     newRecord.type === 'weight' ? 'kg' :
                     newRecord.type === 'temperature' ? 'celsius' : 'percent'))}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={addHealthRecord}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  {t('health.addReading')}
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-lg font-medium py-4 px-6 rounded-lg transition-colors duration-200"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Today's Readings */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('health.todaysReadings')}</h3>
        {todayRecords.length > 0 ? (
          <div className="space-y-4">
            {todayRecords.map((record) => {
              const IconComponent = getHealthIcon(record.type);
              const statusColor = getStatusColor(record.status);
              
              return (
                <div key={record.id} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className={`bg-${statusColor}-100 p-3 rounded-full`}>
                    <IconComponent className={`h-6 w-6 text-${statusColor}-600`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800">{t(`healthMetrics.${record.type}`)}</h4>
                    <p className="text-gray-600 text-lg">{record.value}</p>
                    <p className="text-gray-500 text-sm">
                      {record.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {record.status === 'normal' || record.status === 'stable' ? (
                      <CheckCircle className={`h-6 w-6 text-${statusColor}-500`} />
                    ) : (
                      <AlertTriangle className={`h-6 w-6 text-${statusColor}-500`} />
                    )}
                    <span className={`text-sm font-medium text-${statusColor}-600`}>
                      {t(`healthStatus.${record.status}`)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">{t('health.noReadings')}</p>
            <p className="text-gray-400">{t('health.addYourFirstReading')}</p>
          </div>
        )}
      </div>

      {/* Health Tips */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('health.dailyHealthTips')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.values(t('healthTips', { returnObjects: true })).map((tip: string, index: number) => (
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
            <h3 className="text-xl font-bold text-red-700">{t('health.healthEmergency')}</h3>
            <p className="text-red-600 text-lg">{t('healthEmergencyText')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health; 