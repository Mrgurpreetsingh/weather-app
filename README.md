# Weather App

Check the current weather on any city on the planet. Switch between metric and imperial units.

![Alt img](https://images.ctfassets.net/zlsyc9paq6sa/3uBrJ07WSM40FpolgjInHY/7d886cb4187b52194bf9b63c183a1d3a/1627637330_x.gif)

## Features

1. User's ability to search cities

2. Current local time and date

3. Temperatures and humidity

4. Wind speed and direction

5. Sunrise and sunset times

6. Metric vs Imperial system

7. Error handling and loading info

## Installation

1. `git clone https://github.com/madzadev/weather-app.git`

2. `cd weather-app`

3. `npm install`

4. Log-in to [Openweathermap.com](https://openweathermap.org/)

5. Create an API key

6. `cp .env.example .env.local`

7. Paste API key for `OPENWEATHER_API_KEY`

8. `npm run dev`

## Contributions

Any feature requests and pull requests are welcome!

## License

The project is under [MIT license](https://choosealicense.com/licenses/mit/).

## Modifications apportées

- Migration de l'API OpenWeatherMap vers [Open-Meteo](https://open-meteo.com/) (gratuit, sans clé API)
- Suppression de la barre de recherche — ville configurée dans `config.json`
- Ajout du rafraîchissement automatique des données toutes les heures
- Résolution de la compatibilité Node.js v22 via `cross-env` (pas besoin si pas de soucis de compatibilité)

## Améliorations possibles

- Afficher les prévisions sur plusieurs jours (l'API Open-Meteo le supporte via `daily`)
- Permettre la configuration de plusieurs villes dans `config.json`
- Ajouter une gestion d'erreur réseau plus robuste (timeout, retry)
- Mettre en cache la dernière réponse pour afficher des données même hors-ligne
- Ajouter des tests unitaires sur les fonctions `getIcon` et `getDescription`
- Interface admin pour configurer la ville sans modifier `config.json` manuellement
- Enrichir le mapping des icônes météos pour couvrir les 27 codes WMO d'Open-Meteo (actuellement 9 icônes il en faudrait plus)
- Chaque MetricsCard (humidité, vent, visibilité...) pourrait avoir une option pour l'afficher ou la masquer selon les besoins du client.
