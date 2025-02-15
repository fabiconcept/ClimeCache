import { useNavigate, useSearchParams } from "react-router-dom";
import { useMyFavoriteCities } from "../../store/myFavoriteCities";
import { useMyWorldCities } from "../../store/myWorldCities";
import "../../styles/TopCard.css";
import { Param } from "../../types";
import { generateId, getCountrySvg } from "../../utilities";
import { useCurrentWeather } from "../../utilities/Hooks/useCurrentWeather";
import { LocalStorageToolkit } from "../../utilities/localStorage";
import HeaderButton from "../global components/HeaderButton";
import { useMyNotes } from "../../store/myNotes";

export default function TopCard({ param }: { param: Param }) {
    const [isLoading, _, cityFullData] = useCurrentWeather(param);
    const { myFavoriteCities, addCity, removeCity } = useMyFavoriteCities();
    const { myWorldCities, addCity: addWorldCity, removeCity: removeWorldCity } = useMyWorldCities();
    const [searchParams] = useSearchParams();
    const { setNoteModalOpen } = useMyNotes();

    const navigate = useNavigate();

    const isFavourite = !!(cityFullData && myFavoriteCities.find((c) => `${c.city}, ${c.country}` === `${cityFullData.location.name}, ${cityFullData.location.country}`));
    const isInWorldCities = !!(cityFullData && myWorldCities.find((c) => `${c.city}, ${c.country}` === `${cityFullData.location.name}, ${cityFullData.location.country}`));
    const addSearchParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams); // Preserve existing params
        newParams.set(key, value); // Add or update the param

        navigate({ search: newParams.toString() }, { replace: true }); // Update URL without reloading
        setNoteModalOpen(true, value);
    };

    return (
        <div className="top-card">
            <div className="top-card-content">
                <span className="label">Location</span>
                <div className="row">
                    <h1>
                        {param.knownCity.city !== "" ? `${param.knownCity.city}, ${param.knownCity.country}` : param.unknownCity}
                    </h1>
                    {!isLoading && cityFullData && <div className="btns">
                        <HeaderButton
                            iconSource="/assets/images/star-line.png"
                            onClick={() => {
                                if (isFavourite) {
                                    removeCity(cityFullData.location.name, cityFullData.location.country);
                                } else {
                                    LocalStorageToolkit.setItem(`weather-${cityFullData.location.name}-${cityFullData.location.country}`, JSON.stringify(cityFullData));
                                    addCity(cityFullData.location.name, cityFullData.location.country);
                                }
                            }}
                            tooltip={isFavourite ? "Remove from favourites" : "Add to favourites"}
                            favoriteBtn={{
                                isFavourite: isFavourite,
                                altIconSource: "/assets/images/star-filled.png"
                            }}
                        />
                        <HeaderButton
                            iconSource="/assets/images/city-line.png"
                            onClick={() => {
                                if (isInWorldCities) {
                                    removeWorldCity(cityFullData.location.name, cityFullData.location.country);
                                } else {
                                    LocalStorageToolkit.setItem(`weather-${cityFullData.location.name}-${cityFullData.location.country}`, JSON.stringify(cityFullData));
                                    addWorldCity(cityFullData.location.name, cityFullData.location.country);
                                }
                            }}
                            tooltip={isInWorldCities ? "Remove from World Cities" : "Add to World Cities"}
                            favoriteBtn={{
                                isFavourite: isInWorldCities,
                                altIconSource: "/assets/images/city-filled.png"
                            }}
                        />
                        <HeaderButton
                            iconSource=""
                            text="Add Note"
                            onClick={() => addSearchParam("note", `${generateId()}`)}
                            tooltip="Add a note"
                        />
                    </div>}
                </div>
                {cityFullData && <div className="row">
                    <h3>{cityFullData.location.country ?? ""}</h3>
                    <img src={getCountrySvg(cityFullData.location.country ?? "")} alt="" />
                </div>}
            </div>
            {cityFullData && <div className="top-card-content right">
                <img
                    className="weather-icon"
                    src={`/assets/svgs/weather/${cityFullData.current.condition.text.trim().toLowerCase().split(' ').join("-")}.svg`}
                    onError={(e) => {
                        e.currentTarget.src = cityFullData.current.condition.icon;
                    }}
                    alt={cityFullData.current.condition.text}
                />
                <div className="data">
                    <h2>{cityFullData.current.temp_c}°</h2>
                    <span>{cityFullData.current.condition.text}</span>
                </div>
            </div>}
        </div>
    )
}
