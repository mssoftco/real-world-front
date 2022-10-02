type storageType = 'local' | 'session';

const isStorageAvailable = () => {
  let localStorage;
  try {
    localStorage = window.localStorage;
    if (localStorage) return true;
  } catch (e) {
    // Access denied :-(
    console.log('Please open your browser memory(cookie) to use the site.');
    return false;
  }
};

const isQuotaExceeded = (e: any) => {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
};

export const saveDataToStorage = (key: string, value: any, storage: storageType = 'local') => {
  if (isStorageAvailable()) {
    try {
      if (storage === 'local') {
        localStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, value);
      }
    } catch (e) {
      if (isQuotaExceeded(e)) {
        // Storage full, maybe notify user or do some clean-up
      }
    }
  }
};

export const getDataFromStorage = (key: string, storage: storageType = 'local') => {
  if (isStorageAvailable()) {
    if (storage === 'local') {
      return localStorage.getItem(key);
    } else {
      return sessionStorage.getItem(key);
    }
  }
  return null;
};
