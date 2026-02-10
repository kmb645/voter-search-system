let votersCache = null;

export async function loadVoters() {
  if (votersCache) {
    return votersCache;
  }

  try {
    // For production, this can be an API call
    // For now, we'll import the JSON directly
    const response = await fetch('/voters.json');
    if (!response.ok) {
      throw new Error('Failed to load voters data');
    }
    votersCache = await response.json();
    return votersCache;
  } catch (error) {
    console.error('Error loading voters:', error);
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