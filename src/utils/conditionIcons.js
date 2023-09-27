import cloudy from "../assets/images/cludy.png";
import sun from "../assets/icons/sun.png";
import overcast from "../assets/icons/overcast.png";
import rain from "../assets/icons/rain.png";
import partlyCloudy from "../assets/icons/partly-cloudy.png";
import clear from "../assets/icons/clear.png";
import snowy from "../assets/icons/snowy.png";

export const getWeatherCondition = (text) => {
  switch (text) {
    case "Patchy rain possible":
      return { icon: cloudy, text: "Cloudy" };
    case "Clear":
      return { icon: clear, text: "Clear" };
    case "Light rain shower":
    case "Light rain":
    case "Light drizzle":
    case "Patchy light drizzle":
    case "Moderate rain":
    case "Heavy rain":
    case "Patchy light rain with thunder":
    case "Moderate or heavy rain with thunder":
      return { icon: rain, text: "Rainy" };
    case "Overcast":
    case "Fog":
    case "Mist":
      return { icon: overcast, text: "Overcast" };
    case "Sunny":
    case "Sun":
      return { icon: sun, text: "Sunny" };
    case "Partly cloudy":
    case "Cloudy":
      return { icon: partlyCloudy, text: "Partly cloudy" };
    default:
      return { icon: snowy, text: "Snow" };
  }
};
