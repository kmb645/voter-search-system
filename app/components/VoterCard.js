"use client";

import { User, Hash, Users, Home, Calendar, Briefcase } from 'lucide-react';

export default function VoterCard({ voter }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{voter.নাম}</h3>
              <p className="text-sm text-gray-500 mt-1">ভোটার নং: {voter["ভোটার নং"]}</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              ক্রমিক: {voter.ক্রমিক}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">পিতা/স্বামী</p>
                <p className="font-medium">{voter["পিতা/স্বামী"]}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">মাতা</p>
                <p className="font-medium">{voter.মাতা}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">পেশা</p>
                <p className="font-medium">{voter.পেশা}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">জন্ম তারিখ</p>
                <p className="font-medium">{voter["জন্ম তারিখ"]}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-2">
              <Home className="w-4 h-4 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">ঠিকানা</p>
                <p className="font-medium">{voter.ঠিকানা}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}