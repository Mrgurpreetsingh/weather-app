import config from "../../config.json";

export default async function handler(req, res) {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(config.city)}&count=1&language=fr&format=json`,
  );
  const geoData = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    return res.status(404).json({ message: "Ville introuvable" });
  }

  const { latitude, longitude, name, country_code, timezone } =
    geoData.results[0];

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,is_day&hourly=visibility&daily=sunrise,sunset&timezone=${encodeURIComponent(timezone)}&wind_speed_unit=ms&forecast_days=1`,
  );
  const weatherData = await weatherRes.json();

  const current = weatherData.current;
  const daily = weatherData.daily;
  const utcOffset = weatherData.utc_offset_seconds;

  const isDay = current.is_day === 1;
  const icon = getIcon(current.weather_code, isDay);
  const description = getDescription(current.weather_code);

  const currentHour = current.time.substring(0, 13);
  const hourIndex = weatherData.hourly.time.findIndex((t) =>
    t.startsWith(currentHour),
  );

  const visibility =
    hourIndex !== -1 ? weatherData.hourly.visibility[hourIndex] : 10000;

  const sunriseUnix =
    Math.floor(new Date(daily.sunrise[0]).getTime() / 1000) - utcOffset;
  const sunsetUnix =
    Math.floor(new Date(daily.sunset[0]).getTime() / 1000) - utcOffset;
  const dtUnix =
    Math.floor(new Date(current.time).getTime() / 1000) - utcOffset;

  // Transformation des données Open-Meteo au format attendu par les composants existants
  res.status(200).json({
    name,
    sys: {
      country: country_code.toUpperCase(),
      sunrise: sunriseUnix,
      sunset: sunsetUnix,
    },
    weather: [{ description, icon }],
    main: {
      temp: current.temperature_2m,
      feels_like: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
    },
    wind: { speed: current.wind_speed_10m, deg: current.wind_direction_10m },
    visibility,
    timezone: utcOffset,
    dt: dtUnix,
  });
}

/*intégrer les mises à jour nécessaires pour le traitement des données et l'affichage
 du résultat, en fonction du format de réponse de l'API d'open meteo"*/
function getIcon(code, isDay) {
  const s = isDay ? "d" : "n";
  if (code === 0) return `01${s}`;
  if (code <= 2) return `02${s}`;
  if (code === 3) return "04d";
  if (code <= 48) return "50d";
  if (code <= 55) return "09d";
  if (code <= 65) return `10${s}`;
  if (code <= 77) return "13d";
  if (code <= 82) return "09d";
  return "11d";
}

function getDescription(code) {
  if (code === 0) return "ciel dégagé";
  if (code <= 2) return "partiellement nuageux";
  if (code === 3) return "nuageux";
  if (code <= 48) return "brouillard";
  if (code <= 55) return "bruine";
  if (code <= 65) return "pluie";
  if (code <= 77) return "neige";
  if (code <= 82) return "averses";
  return "orage";
}
