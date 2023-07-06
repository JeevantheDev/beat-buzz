const AUTH_API = {
  DEV: "http://localhost:7998/.netlify/functions/server",
  PROD: "https://beatbuzz-user-service.netlify.app/.netlify/functions/server",
};

const FETCH_API = {
  DEV: "http://localhost:7996",
  PROD: "Not available yet",
};

const YOUTUBE_API = {
  DEV: "http://localhost:7999",
  PROD: "Not available yet",
};

export const getAPIUrl = (
  type: "auth" | "song" | "playlist" | "fetch" | "youtube",
  env: "DEV" | "PROD" = "DEV"
) => {
  if (type === "auth") {
    return AUTH_API[env];
  }

  if (type === "fetch") {
    return FETCH_API[env];
  }
  if (type === "youtube") {
    return YOUTUBE_API[env];
  }
};
