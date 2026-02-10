"use client";

import { Search, Filter, Download, X } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

export default function SearchBar({ 
  onSearch, 
  searchTerm, 
  setSearchTerm, 
  onExport,
  filteredVoters,
  totalVoters,
  loading 
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    পেশা: '',
    এলাকা: '',
    "জন্ম বছর": ''
  });

  const professions = [
    'সব পেশা',
    'শ্রমিক',
    'সরকারী চাকুরী',
    'ব্যবসা',
    'কৃষক',
    'শিক্ষক',
    'গৃহিণী',
    'চিকিৎসক',
    'ইঞ্জিনিয়ার',
    'আইনজীবী',
    'ছাত্র'
  ];

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    onSearch(searchTerm, filters);
  }, [searchTerm, filters, onSearch]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(searchTerm, newFilters);
  };

  const resetFilters = () => {
    setFilters({
      পেশা: '',
      এলাকা: '',
      "জন্ম বছর": ''
    });
    onSearch(searchTerm, {});
  };

  // TODO: There are input text search bar start right side i need it left 
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">ভোটার তথ্য অনুসন্ধান</h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredVoters} জন পাওয়া গেছে (মোট: {totalVoters})
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              ফিল্টার
              {showFilters && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
            </button>
            
            <button
              onClick={onExport}
              disabled={loading || filteredVoters === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              CSV ডাউনলোড
            </button>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative mb-4">
          <div className="relative">
            {/* Move Search icon to left */}
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ভোটার নং, নাম, পিতা/স্বামীর নাম বা ঠিকানা অনুসন্ধান করুন..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-lg"
              // Remove dir="rtl" or change to dir="ltr" for left-to-right text
              dir="ltr"
            />
          </div>
          {/* Move X button to right side */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('', filters);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </form>

        {/* Quick Search Tips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm text-gray-500">দ্রুত অনুসন্ধান:</span>
          <button
            onClick={() => setSearchTerm('মোঃ')}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          >
            মোঃ
          </button>
          <button
            onClick={() => setSearchTerm('বেগম')}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          >
            বেগম
          </button>
          <button
            onClick={() => setSearchTerm('বরিশাল')}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          >
            বরিশাল
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-700">উন্নত ফিল্টার</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পেশা
                </label>
                <select
                  value={filters.পেশা}
                  onChange={(e) => handleFilterChange('পেশা', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {professions.map(prof => (
                    <option key={prof} value={prof === 'সব পেশা' ? '' : prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  এলাকা
                </label>
                <input
                  type="text"
                  value={filters.এলাকা}
                  onChange={(e) => handleFilterChange('এলাকা', e.target.value)}
                  placeholder="উপজেলা/গ্রাম"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  জন্ম বছর
                </label>
                <input
                  type="number"
                  value={filters["জন্ম বছর"]}
                  onChange={(e) => handleFilterChange('জন্ম বছর', e.target.value)}
                  placeholder="যেমন: 1960"
                  min="1900"
                  max="2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium mb-1">সার্চ টিপস:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>আংশিক নাম লিখুন: "হাবিবুর"</li>
            <li>ভোটার নম্বর: "০৬০২১৭৬৫৫৯৬১"</li>
            <li>পিতার নাম: "আবদুর রব"</li>
            <li>এলাকা: "বাবুগঞ্জ" বা "মহিষাদী"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}