import { geoApiOptions } from "../utils/geoApi";

export const listbox = {
  displayField: "name",
  data: (query) =>
    fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${encodeURIComponent(
        query
      )}&limit=5`,
      geoApiOptions
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res.data.map((city) => {
          return { name: city.name };
        });
      })
      .catch((err) => console.log(err)),
  searchType: "startswith",
};

export const styles = {
  container: "w-full pl-[5px] ",
  containerFocus: "w-full pl-[5px]",
  input:
    "h-full w-full bg-transparent text-[16px] sm:text-[12px] outline-none placeholder:text-[12px] placeholder:text-[#090909d2]",
  query: "text-oldsilver-800 placeholder-oldsilver-400",
  typeahead: "hidden text-crystal-500 border-white",
  clearButton:
    "absolute inset-y-0 right-[5px] text-[24px] sm:text-[16px] w-8 inline-flex items-center justify-center text-crystal-500 hover:text-hotpink-300",
  listbox: "w-full p-[12px] sm:p-[8px] text-left top-[50px] sm:top-[38px] left-0 bg-[#ffdcbf]",
  item: "cursor-pointer p-1.5 text-[14px] sm:text-[11px] overflow-ellipsis overflow-hidden text-oldsilver-700",
  highlightedItem:
    "cursor-pointer p-1.5 text-[16px] sm:text-[14px] overflow-ellipsis overflow-hidden text-oldsilver-700 rounded bg-crystal-100",
  match: "",
  noItems: "cursor-default text-[18px] text-center my-[20px]",
};
