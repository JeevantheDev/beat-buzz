const AUTH_API = {
  DEV: 'http://localhost:7998/.netlify/functions/server',
  PROD: 'https://beatbuzz-api-service.netlify.app/.netlify/functions/server/api/v1/beatbuzz/auth',
};

const FETCH_API = {
  DEV: 'http://localhost:7996',
  PROD: 'https://beatbuzz-fetch-service.onrender.com',
};

const SONG_SERVICE_API = {
  DEV: 'http://localhost:7997/.netlify/functions/server',
  PROD: 'https://beatbuzz-api-service.netlify.app/.netlify/functions/server/api/v1/beatbuzz/song',
};

const YOUTUBE_API = {
  DEV: 'http://localhost:7999',
  PROD: 'https://beatbuzz-api-service.netlify.app/.netlify/functions/server/api/v1/beatbuzz/youtube',
};

export const getAPIUrl = (
  type: 'auth' | 'song' | 'playlist' | 'fetch' | 'youtube',
  env: 'DEV' | 'PROD' = 'PROD'
) => {
  if (type === 'auth') {
    return AUTH_API[env];
  }

  if (type === 'fetch') {
    return FETCH_API[env];
  }
  if (type === 'youtube') {
    return YOUTUBE_API[env];
  }
  if (type === 'song') {
    return SONG_SERVICE_API[env];
  }
};
