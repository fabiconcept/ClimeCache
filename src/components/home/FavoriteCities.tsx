import '../../styles/Cities.css';
import City from './City';
import { useMyFavoriteCities } from '../../store/myFavoriteCities';

export default function FavoriteCities() {
    const { myFavoriteCities } = useMyFavoriteCities();

    if (myFavoriteCities.length === 0) return null;

    return (
        <div className="cities-container">
            <p className="title">Favorite Cities <span>({`${myFavoriteCities.length < 9 ? "0" : ""}${myFavoriteCities.length > 99 ? "99+" : myFavoriteCities.length}`})</span></p>

            <div className="cities">
                {myFavoriteCities
                    .slice()
                    .sort((a, b) => {
                        const cityA = a.city.toLowerCase() + a.country.toLowerCase();
                        const cityB = b.city.toLowerCase() + b.country.toLowerCase();
                        return cityA.localeCompare(cityB);
                    })
                    .map((city, index) => (
                        <City key={index} city={city.city} type="favorite-city" country={city.country} />
                    ))}
            </div>
        </div>
    )
}
