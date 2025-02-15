import HeaderComponent from "../components/home/HeaderComponent";
import MyWeatherCard from "../components/home/MyWeatherCard";
import '../styles/home.css';
import FavoriteCities from "../components/home/FavoriteCities";
import WorldCities from "../components/home/WorldCities";

export default function Home() {
    return (
        <div className="home">
            <HeaderComponent />
            <div className="body">
                <MyWeatherCard />
                <FavoriteCities />
                <WorldCities />
            </div>
        </div>
    )
}
