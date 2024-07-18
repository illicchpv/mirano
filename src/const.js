// сервер Максима
// export const API_URL = 'https://mirano-api.onrender.com';

// мой сервер
export const API_URL = 'https://mirano-api-4txw.onrender.com';
// swagger https://mirano-api-4txw.onrender.com/api-docs



// ------------utils--------------------------------

export const gatValidFilters = (filters) => {
  const v = {};

  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key) && filters[key]) {
      v[key] = filters[key];
    }
  }
  return v;
};

export const debounce = (fn, ms) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return function (...args) {
    const prevCall = lastCall;
    lastCall = Date.now();
    if (prevCall && lastCall - prevCall < ms) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const isNumber = (n) => {
  return !isNaN(parseInt(n)) && isFinite(n);
};

export const adjustElementPosition = (element, count = 0) => {
  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.left < 0) {
    element.style.cssText = `
      left: 0;
      right: auto;
      transform: translateX(0)
    `;
  } else if (rect.right > viewportWidth) {
    element.style.cssText = `
      left: auto;
      right: 0;
      transform: translateX(0)
    `;
  } else {
    element.style.cssText = `
      left: 50%;
      right: auto;
      transform: translateX(-50%)
    `;
  }

  const postRect = element.getBoundingClientRect();

  if ((postRect.left < 0 || postRect.right > viewportWidth) && count > 3) {
    adjustElementPosition(element, ++count);
  }
};

export function deliveryDate(dh = 0) {
  const ms = Date.now() + (dh * 60 * 60 * 1000) + (3 * 60 * 60 * 1000); 
  const t1 = new Date(ms);
  const t1d = t1.getDay();
  if(t1d === new Date().getDay()) {
    const t1h = t1.getHours();
    if(t1h > 21) {
      return { value: '9-12', title:'завтра с 9:00 до 12', }
    }else if(t1h > 18) {
      return { value: '18-21', title:'с 18:00 до 21', }
    }else if(t1h > 15) {
      return { value: '15-18', title:'с 15:00 до 18', }
    }else if(t1h > 12) {
      return { value: '12-15', title:'с 12:00 до 15', }
    } else {
      return { value: '9-12', title:'с 9:00 до 12', }
    }
  }else{
    return { value: '9-12', title:'завтра с 9:00 до 12', }
  }
}