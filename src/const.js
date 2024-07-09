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
}