import { useMyWorldCities } from '../../store/myWorldCities';
import '../../styles/Cities.css';
import City from './City';

export default function WorldCities() {
    const { myWorldCities } = useMyWorldCities();

    if (myWorldCities.length === 0) return null;

    return (
        <div className="cities-container">
            <p className="title">World Cities <span>({`${myWorldCities.length < 9 ? "0" : ""}${myWorldCities.length > 99 ? "99+" : myWorldCities.length}`})</span></p>

            <div className="cities">
                {myWorldCities
                    .slice()
                    .sort((a, b) => {
                        const cityA = a.city.toLowerCase() + a.country.toLowerCase();
                        const cityB = b.city.toLowerCase() + b.country.toLowerCase();
                        return cityA.localeCompare(cityB);
                    })
                    .map((city, index) => (
                        <City key={index} city={city.city} country={city.country} />
                    ))}
            </div>
        </div>
    )
}
