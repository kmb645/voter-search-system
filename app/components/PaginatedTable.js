"use client";

import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ITEMS_PER_PAGE = 50;

export default function PaginatedTable({ voters }) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const pageCount = Math.ceil(voters.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = voters.slice(offset, offset + ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (voters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">কোন ভোটার পাওয়া যায়নি</h3>
        <p className="text-gray-500">আপনার অনুসন্ধানের সাথে মিলে এমন কোনো ভোটার নেই</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-blue-700">
              <span className="font-semibold">{voters.length}</span> জন ভোটার পাওয়া গেছে
            </p>
            <p className="text-xs text-blue-600 mt-1">
              পৃষ্ঠা {currentPage + 1} এর {currentItems.length} জন দেখানো হচ্ছে
            </p>
          </div>
          <div className="text-sm text-blue-700">
            <span className="font-medium">সাজানো:</span> ক্রমিক নম্বর অনুযায়ী
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-blue-600 text-white">
            <div className="grid grid-cols-8 min-w-[1200px]">
              {['ক্রমিক', 'নাম', 'ভোটার নং', 'পিতা/স্বামী', 'মাতা', 'পেশা', 'জন্ম তারিখ', 'ঠিকানা'].map((header, idx) => (
                <div key={idx} className="px-4 py-3 text-right font-semibold text-sm uppercase tracking-wider">
                  {header}
                </div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {currentItems.map((voter, index) => {
              // Generate a unique key
              const uniqueKey = voter.id || 
                                voter['ভোটার নং'] || 
                                `${voter.নাম}-${voter['জন্ম তারিখ']}-${index}`;
              
              return (
                <div 
                  key={uniqueKey}
                  className="grid grid-cols-8 min-w-[1200px] hover:bg-gray-50 transition-colors"
                >
                  <div className="px-4 py-3 text-sm text-gray-900">{voter.ক্রমিক || `#${offset + index + 1}`}</div>
                  <div className="px-4 py-3 text-sm font-medium text-gray-900">{voter.নাম}</div>
                  <div className="px-4 py-3 text-sm text-gray-900 font-mono dir-ltr">{voter['ভোটার নং']}</div>
                  <div className="px-4 py-3 text-sm text-gray-900">{voter['পিতা/স্বামী']}</div>
                  <div className="px-4 py-3 text-sm text-gray-900">{voter.মাতা}</div>
                  <div className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      voter.পেশা === 'সরকারী চাকুরী' ? 'bg-green-100 text-green-800' :
                      voter.পেশা === 'ব্যবসা' ? 'bg-purple-100 text-purple-800' :
                      voter.পেশা === 'শিক্ষক' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {voter.পেশা}
                    </span>
                  </div>
                  <div className="px-4 py-3 text-sm text-gray-900">{voter['জন্ম তারিখ']}</div>
                  <div className="px-4 py-3 text-sm text-gray-900">{voter.ঠিকানা}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageClick({ selected: Math.max(0, currentPage - 1) })}
              disabled={currentPage === 0}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              পূর্ববর্তী
            </button>
            <button
              onClick={() => handlePageClick({ selected: Math.min(pageCount - 1, currentPage + 1) })}
              disabled={currentPage === pageCount - 1}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              পরবর্তী
            </button>
          </div>
          
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{(currentPage * ITEMS_PER_PAGE) + 1}</span> থেকে{' '}
                <span className="font-medium">
                  {Math.min((currentPage + 1) * ITEMS_PER_PAGE, voters.length)}
                </span>{' '}
                এর <span className="font-medium">{voters.length}</span> ভোটারের
              </p>
            </div>
            
            <ReactPaginate
              previousLabel={<ChevronLeft className="w-5 h-5" />}
              nextLabel={<ChevronRight className="w-5 h-5" />}
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-1"
              pageClassName="hidden sm:block"
              pageLinkClassName="px-3 py-1 border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 rounded"
              activeClassName="hidden sm:block"
              activeLinkClassName="px-3 py-1 border border-blue-500 text-sm text-white bg-blue-500 rounded"
              previousClassName="inline-flex items-center px-2 py-2 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              nextClassName="inline-flex items-center px-2 py-2 border border-gray-300 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </div>
      )}
    </div>
  );
}