// Copy script deteksi bahasa & tema untuk website Bijak
export const initDetectScript = `
(function() {
  const storedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (window.location.pathname === '/' && !sessionStorage.getItem('lang_detected')) {
    sessionStorage.setItem('lang_detected', 'true');
    const browserLang = navigator.language || navigator.userLanguage;
    const isEn = browserLang.startsWith('en');

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country_code;
        if (countryCode !== 'ID') {
          window.location.href = '/en/';
        }
      })
      .catch(() => {
        if (isEn) {
          window.location.href = '/en/';
        }
      });
  }
})();
`;
