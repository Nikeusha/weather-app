export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${process.env.REACT_APP_API_KEY}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
