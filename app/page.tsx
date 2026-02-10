"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import VoterTable from './components/VoterTable';
import VoterCard from './components/VoterCard';
import voters from './data/voters'
import PaginatedTable from './components/PaginatedTable';
import { Users, Grid, List, Smartphone, Wifi, WifiOff } from 'lucide-react';
import { exportToCSV, downloadCSV, loadVoters } from './utils/dataLoader';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('online');

  // Load voters data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await loadVoters();
        setVoters(data);
      } catch (error) {
        console.error('Error loading voters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setConnectionStatus('online');
    const handleOffline = () => setConnectionStatus('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Filter voters based on search term and filters
  const filteredVoters = useMemo(() => {
    if (!voters.length) return [];

    let result = [...voters];

    // Apply text search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(voter =>
        voter.নাম.toLowerCase().includes(term) ||
        voter['ভোটার নং'].includes(term) ||
        voter['পিতা/স্বামী'].toLowerCase().includes(term) ||
        voter.মাতা.toLowerCase().includes(term) ||
        voter.ঠিকানা.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.পেশা) {
      result = result.filter(voter => voter.পেশা === filters.পেশা);
    }
    
    if (filters.এলাকা) {
      result = result.filter(voter => 
        voter.ঠিকানা.toLowerCase().includes(filters.এলাকা.toLowerCase())
      );
    }
    
    if (filters['জন্ম বছর']) {
      const year = filters['জন্ম বছর'];
      result = result.filter(voter => {
        const birthDate = voter['জন্ম তারিখ'];
        return birthDate && birthDate.includes(year);
      });
    }

    return result;
  }, [voters, searchTerm, filters]);

  const handleSearch = useCallback((term, newFilters = {}) => {
    setSearchTerm(term);
    setFilters(newFilters);
  }, []);

  const handleExport = useCallback(() => {
    if (filteredVoters.length === 0) return;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `ভোটার_তালিকা_${timestamp}.csv`;
    const csvContent = exportToCSV(filteredVoters);
    downloadCSV(filename, csvContent);
  }, [filteredVoters]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">ভোটার তালিকা লোড হচ্ছে...</p>
          <p className="text-sm text-gray-500 mt-2">দয়া করে কিছুক্ষণ অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Connection Status */}
      <div className={`sticky top-0 z-50 ${connectionStatus === 'online' ? 'bg-green-600' : 'bg-red-600'} text-white py-2 px-4 text-sm text-center`}>
        <div className="container mx-auto flex items-center justify-center gap-2">
          {connectionStatus === 'online' ? (
            <>
              <Wifi className="w-4 h-4" />
              <span>ইন্টারনেট সংযোগ আছে</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span>অফলাইন মোড</span>
            </>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">বাংলাদেশ ভোটার তালিকা</h1>
              <p className="text-blue-100 text-sm md:text-base">মোবাইল ফ্রেন্ডলি ভোটার তথ্য সিস্টেম</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 bg-blue-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6" />
                <div className="text-center">
                  <p className="text-xl font-bold">{voters.length}</p>
                  <p className="text-xs text-blue-200">মোট ভোটার</p>
                </div>
              </div>
              
              <div className="mt-2 flex items-center space-x-1 text-xs bg-black/20 px-2 py-1 rounded">
                <Smartphone className="w-3 h-3" />
                <span>মোবাইল অপটিমাইজড</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-6 -mt-2">
        <SearchBar 
          onSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={handleExport}
          filteredVishers={filteredVoters.length}
          totalVoters={voters.length}
          loading={loading}
        />
      </div>

      {/* Mobile Download Banner */}
      <div className="container mx-auto px-4 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">মোবাইলে ডাউনলোড করুন</h3>
                <p className="text-sm text-green-100">ভোটার তালিকা CSV ফাইল হিসেবে ডাউনলোড করুন</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              disabled={filteredVoters.length === 0}
              className="px-4 py-2 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              CSV ডাউনলোড ({filteredVoters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 pb-12">
        {/* View Mode Toggle for Mobile */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                ভোটার তালিকা
              </h2>
              <p className="text-sm text-gray-600">
                {filteredVoters.length} জন পাওয়া গেছে
              </p>
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm ${
                  viewMode === 'table' ? 'bg-white shadow' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">তালিকা</span>
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm ${
                  viewMode === 'card' ? 'bg-white shadow' : 'text-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">কার্ড</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {viewMode === 'table' ? (
          <PaginatedTable voters={filteredVoters} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVoters.map((voter) => (
              <VoterCard key={voter.id} voter={voter} />
            ))}
          </div>
        )}

        {/* Mobile Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            মোবাইল ব্যবহার টিপস:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• টেবিল দেখতে হরাইজন্টাল স্ক্রল করুন</li>
            <li>• CSV ডাউনলোড করতে উপরের সবুজ বাটনে ক্লিক করুন</li>
            <li>• অফলাইনেও সর্বশেষ ডেটা দেখতে পারবেন</li>
            <li>• কার্ড ভিউতে প্রতিটি ভোটারের বিস্তারিত তথ্য দেখুন</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} ভোটার তথ্য সিস্টেম</p>
            <p className="text-sm text-gray-500 mt-2">
              এই সিস্টেমে মোট {voters.length} জন ভোটারের তথ্য রয়েছে
            </p>
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>মোবাইল ব্রাউজারে ডাউনলোডের পর CSV ফাইল ওপেন করুন</p>
              <p>এক্সেল বা গুগল শীটসে ডেটা ভিউ করুন</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}