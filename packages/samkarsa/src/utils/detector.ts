// GeoIP / Language detection script
// Digunakan di client-side head untuk redirect ke locale/bahasa yang tepat atau mode dark/light
export const initDetectScript = `
(function() {
  // Dark/Light Mode setup
  const storedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Locale / IP / Location language check
  // Hanya lakukan auto-redirect jika user berada di homepage "/"
  if (window.location.pathname === '/' && !sessionStorage.getItem('lang_detected')) {
    sessionStorage.setItem('lang_detected', 'true');
    
    // Gunakan browser language preference sebagai fallback gratis tercepat
    const browserLang = navigator.language || navigator.userLanguage;
    const isEn = browserLang.startsWith('en');

    // Jika ingin lebih akurat lewat IP, kita lakukan fetch geoip non-blocking
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country_code;
        if (countryCode !== 'ID') {
          // Redirect ke versi bahasa Inggris jika pengakses di luar Indonesia
          window.location.href = '/en/';
        }
      })
      .catch(() => {
        // Fallback ke browser lang jika API limit/error
        if (isEn) {
          window.location.href = '/en/';
        }
      });
  }
})();
`;
