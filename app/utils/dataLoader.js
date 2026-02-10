let votersCache = null;

export async function loadVoters() {
  if (votersCache) {
    return votersCache;
  }

  try {
    // Load data from both JSON files
    const [votersResponse, femaleResponse] = await Promise.all([
      fetch('/voters.json'),
      fetch('/female.json')
    ]);

    if (!votersResponse.ok || !femaleResponse.ok) {
      throw new Error('Failed to load voters data');
    }

    const maleVoters = await votersResponse.json();
    const femaleVoters = await femaleResponse.json();

    // Combine both datasets
    // Note: You might need to adjust this based on the actual structure of your JSON files
    const combinedVoters = [
      ...(Array.isArray(maleVoters) ? maleVoters : []),
      ...(Array.isArray(femaleVoters) ? femaleVoters : [])
    ];

    // Optional: Add a unique ID to each voter if not present
    combinedVoters.forEach((voter, index) => {
      if (!voter.id) {
        voter.id = `voter_${index}`;
      }
    });

    votersCache = combinedVoters;
    return votersCache;
  } catch (error) {
    console.error('Error loading voters:', error);
    
    // Fallback: Try to load at least one file
    try {
      const response = await fetch('/voters.json');
      if (response.ok) {
        votersCache = await response.json();
        return votersCache;
      }
    } catch (fallbackError) {
      console.error('Fallback loading also failed:', fallbackError);
    }
    
    return [];
  }
}

export function exportToCSV(voters) {
  if (!voters || voters.length === 0) return '';
  
  const headers = ['ক্রমিক', 'নাম', 'ভোটার নং', 'পিতা/স্বামী', 'মাতা', 'পেশা', 'জন্ম তারিখ', 'ঠিকানা'];
  
  const csvRows = [
    headers.join(','),
    ...voters.map(voter => [
      voter.ক্রমিক,
      `"${voter.নাম}"`,
      voter['ভোটার নং'],
      `"${voter['পিতা/স্বামী']}"`,
      `"${voter.মাতা}"`,
      `"${voter.পেশা}"`,
      voter['জন্ম তারিখ'],
      `"${voter.ঠিকানা}"`
    ].join(','))
  ];
  
  return csvRows.join('\n');
}

export function downloadCSV(filename, csvContent) {
  // Create blob with UTF-8 BOM for Bangla support
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
}