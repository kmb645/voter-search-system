"use client";

export default function VoterTable({ voters }) {
  if (voters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">কোন ভোটার পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">ক্রমিক</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">নাম</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">ভোটার নং</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">পিতা/স্বামী</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">মাতা</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">পেশা</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">জন্ম তারিখ</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">ঠিকানা</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {voters.map((voter) => (
            <tr key={voter.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.ক্রমিক}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{voter.নাম}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{voter["ভোটার নং"]}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter["পিতা/স্বামী"]}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.মাতা}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.পেশা}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter["জন্ম তারিখ"]}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{voter.ঠিকানা}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}