import { FaArrowRightLong, FaTrash } from "react-icons/fa6";
import { getCountrySvg } from "../../utilities";
import { useMyWorldCities } from "../../store/myWorldCities";
import { useCurrentWeather } from "../../utilities/Hooks/useCurrentWeather";
import { useNavigate } from "react-router-dom";
import { useMyFavoriteCities } from "../../store/myFavoriteCities";

export default function City({ city, country, type = "world-city" }: { city: string; country: string, type?: "world-city" | "favorite-city" }) {
    const navigate = useNavigate();
    const { removeCity } = useMyWorldCities();
    const { removeCity: removeFavoriteCity } = useMyFavoriteCities();
    const [isLoading, cityData] = useCurrentWeather({ knownCity: { city, country } });

    return (
        <div className="city-wrapper">
            <div className="city" title={`${city}, ${country}`} onClick={() => navigate(`/details?query=${city}, ${country}&type=known`)}>
                <div className="top">
                    {cityData && <span>{cityData?.feelsLike}°</span>}
                    {!cityData && <span>{isLoading ? "..." : "No Data"}</span>}
                    <img
                        src={`/assets/svgs/weather/${cityData?.weather_descriptions.trim().toLowerCase().split(" ").join("-") ?? "not-available"}.svg`}
                        onError={(e) => {
                            if (cityData?.weather_descriptions) {
                                e.currentTarget.src = `//cdn.weatherapi.com/weather/64x64/day/116.png`;
                            }
                        }}
                        alt={cityData?.weather_descriptions ?? "Weather icon"}
                    />
                </div>
                <div className="bottom">
                    {!isLoading && <span className="label">{cityData?.weather_descriptions}</span>}
                    <div className="state-wrapper">
                        <div className="state">
                            <p>{city}, {country}</p>
                            <img src={country ? getCountrySvg(country) : "/assets/svgs/us.svg"} alt="" />
                        </div>
                        <FaArrowRightLong className="city-arrow" />
                    </div>
                </div>
            </div>

            <div className="trash" title="Delete City" onClick={() => type === "favorite-city" ? removeFavoriteCity(city, country) : removeCity(city, country)}>
                <FaTrash className="icon" />
            </div>
        </div >
    )
}
