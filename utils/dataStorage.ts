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

export const setDataToStorage = (key: string, value: any, isStringify: boolean = false, storage: storageType = 'local') => {
  if (isStorageAvailable()) {
    try {
      let inputValue = value;
      if (isStringify) {
        inputValue = JSON?.stringify(value);
      }
      if (storage === 'local') {
        localStorage.setItem(key, inputValue);
      } else {
        sessionStorage.setItem(key, inputValue);
      }
    } catch (e) {
      if (isQuotaExceeded(e)) {
        // Storage full
      }
    }
  }
};

export const getDataFromStorage = (key: string, isParse: boolean = false, storage: storageType = 'local') => {
  if (isStorageAvailable()) {
    try {
      let result;
      if (storage === 'local') {
        result = localStorage.getItem(key);
      } else {
        result = sessionStorage.getItem(key);
      }
      if (isParse) {
        // @ts-ignore
        return JSON?.parse(result);
      }
      return result;
    } catch (e) {
      if (isQuotaExceeded(e)) {
        // Storage full
      }
    }
  }
  return null;
};

export const removeDataFromStorage = (key: string, storage: storageType = 'local') => {
  if (!isStorageAvailable()) {
    return null;
  }
  if (storage === 'local') {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};
