import { FaWind } from "react-icons/fa6";
import StatCard from "../global components/StatCard";
import { useMyCurrentLocation } from "../../store/weather data/myCurrentLocation";
import LoadingStatCard from "../global components/LoadingStatCard";

export default function WindSpeed() {
    const { weatherData, status } = useMyCurrentLocation();

    return (
        status === "success" ?
            !weatherData || !weatherData.current ? <>{"An error occurred while fetching weather data."}</> :
                <StatCard>
                    <p className="title">Wind speed</p>
                    <div className="row">
                        <div className="info">
                            <div className="icon"><FaWind /></div>
                            <div className="stat">
                                <span className="value">{weatherData.current.wind_kph}<span>km/h</span></span>
                            </div>
                        </div>
                    </div>
                </StatCard>
            :
            <LoadingStatCard />
    )
}
