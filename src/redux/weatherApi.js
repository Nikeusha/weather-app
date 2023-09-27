import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weatherapi-com.p.rapidapi.com/forecast.json",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", `${process.env.REACT_APP_API_KEY}`);
      headers.set("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");
      return headers;
    },
  }),
  tagTypes: ["Weather"],
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (name) => ({
        url: "",
        params: { q: name, days: "7" },
      }),
      providesTags: ["Weather"],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
