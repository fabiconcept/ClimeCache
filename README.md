# Weather App

This project is a weather application built with TypeScript and Vite. It provides weather details, allows users to search for cities, and offers additional features like favorite cities and notes.

#### **Project Figma UI Link**
Designed the UI for the Project in Figma.
[Link](https://www.figma.com/design/r034RyBhd4m4lmkUFEVaQN/ESA-Tasks?node-id=4-2&t=wOR3v5CCMXq1n8M3-0)

## Project Structure

### 1. **Components (`src/components/`)**

#### **1.1 Details (`components/details/`)**
- `FeelsLike.tsx`: Displays the "feels like" temperature
- `HeaderComponent.tsx`: Header component with search, notes list, and settings
- `Note.tsx`: Individual note representation
- `Notes.tsx`: Displays list of user notes
- `StatsCard.tsx`: Card component for displaying weather statistics
- `StatsTray.tsx`: Displays a tray of weather statistics
- `TopCard.tsx`: Shows primary weather information

#### **1.2 Global Components (`components/global-components/`)**
- `HeaderButton.tsx`: Navigation button component
- `LoadingStatsCard.tsx`: Loading state for statistics cards
- `MenuNotes.tsx`: Notes list modal
- `SearchComponent.tsx`: Search functionality with auto-complete
- `SettingsMenu.tsx`: Settings dropdown menu
- `StatCard.tsx`: Weather statistics card

#### **1.3 Home Components (`components/home/`)**
- `City.tsx`: City weather details component
- `FavoriteCities.tsx`: Favorite cities list
- `FeelsLike.tsx`: Temperature feel display
- `HeaderComponent.tsx`: Home page header
- `Humidity.tsx`: Humidity information
- `MyWeatherCard.tsx`: Main weather card
- `WindSpeed.tsx`: Wind speed display
- `WorldCities.tsx`: Major cities list

#### **1.4 Notes Components (`components/Notes/`)**
- `Modal.tsx`: Notes management modal
- `Note.tsx`: Individual note component

### 2. **Utilities (`src/utilities/`)**

#### **2.1 Hooks (`utilities/Hooks/`)**
- `useAutoComplete.ts`: Auto-completion functionality
- `useControlPress.ts`: Keyboard control handling
- `useCurrentWeather.ts`: Weather data management
- `useDebounce.ts`: Input debouncing

#### **2.2 Other Utilities**
- `WeatherApi.ts`: Weather API integration
- `localStorage.ts`: Local storage management
- `index.ts`: Utility functions
- `country.json`: Country data

### 3. **Store (`src/store/`)**

#### **3.1 Weather Data (`store/`)**
- `weather data/myCurrentLocation.ts`: Current location management
- `Autocomplete.ts`: Search auto-completion logic
- `HeaderMenu.ts`: Header menu state
- `Location.ts`: Location handling
- `myFavoriteCities.ts`: Favorite cities management
- `myNotes.ts`: Notes state management
- `myWorldCities.ts`: World cities data
- `Search.ts`: Search functionality

### 4. **Styles (`src/store/styles/`)**
- `Cities.css`: City components styling
- `header-component.css`: Header styling
- `home.css`: Home page styles
- `menu-notes.css`: Notes menu styling
- `MyWeatherCard.css`: Weather card styles
- `Notes.css`: Notes component styles
- `search-component.css`: Search styling
- `statsTray.css`: Statistics tray styles
- `TopCard.css`: Top card component styles

### 5. **Types (`src/store/types/`)**
- `autoComplete.ts`: Auto-completion types
- `currentWeather.ts`: Weather data types
- `endpoints.ts`: API endpoint definitions
- `index.ts`: Common types

## Installation

1. Install dependencies:
   ```sh
   npm install
   ```

2. Create a `.env` file:
   ```sh
   touch .env
   ```
   Fill with necessary environment variables:
   ```sh
   VITE_WEATHER_API_KEY=<your_api_key>
   VITE_WEATHER_AUTOCOMPLETE_API_KEY=<your_api_key>
   VITE_WEATHER_BASE_URL=https://api.weather.com
   VITE_WEATHER_AUTOCOMPLETE_BASE_URL=https://api.weatherautocomplete.com
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Run tests:
   ```sh
   npm run test
   ```

## Features
- Real-time weather information
- City search with auto-complete
- Favorite cities management
- Detailed weather statistics
- Notes and reminders system
- Responsive design for all devices
- CTRL + (K,F,L) keyboard shortcuts to search 

## API Integration
- OpenWeather API integration for weather data
- Location-based auto-complete search
- Local storage for favorites and settings

## State Management
- Redux Toolkit implementation
- Custom hooks for state management
- Local storage persistence

### **App Pages**
- Home page
![Home Page](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20113945.png)

- Details page
![Details Page](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20114122.png)

## Features Images
- Notes list
![Notes List](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20114154.png)
- Settings menu
![Settings Menu](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20114202.png)
- Favorite cities & World Cities
![Favorite Cities & World Cities](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20113959.png)
- Search with AutoComplete
![Search](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20114017.png)
- Note View
![Note View](https://esa-project.sirv.com/weather/Screenshot%202025-02-21%20114144.png)
