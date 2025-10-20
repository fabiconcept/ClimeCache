import { FaClock, FaCloud, FaCompass, FaEye, FaTemperatureEmpty, FaTemperatureHigh, FaTemperatureLow, FaWater, FaWind } from "react-icons/fa6";
import "../../styles/statsTray.css";
import LoadingStatCard from "../global components/LoadingStatCard";
import StatsCard from "./StatsCard";
import { Param } from "../../types";
import { useCurrentWeather } from "../../utilities/Hooks/useCurrentWeather";

export default function StatsTray({ param }: { param: Param }) {
    const [isLoading, _, cityFullData, error] = useCurrentWeather(param);

    const getLocationString = () => {
        if (param.knownCity.city && param.knownCity.country) {
            return `${param.knownCity.city}, ${param.knownCity.country}`;
        } else if (param.unknownCity) {
            return param.unknownCity;
        } else if (param.myLocation) {
            return "your location";
        }
        return "unknown location";
    };

    return (
        <div className="stats-tray">
            {!isLoading && cityFullData ? <>
                <StatsCard Icon={FaClock} iconClass="vibrate" title="Last Updated" unit={!!(Number(cityFullData.current.last_updated.split(" ")[1].split("").splice(0, 2).join("")) < 12) ? "AM" : "PM"} value={cityFullData.current.last_updated.split(" ")[1]} />
                <StatsCard Icon={FaTemperatureHigh} iconClass="heartbeat" title="Temperature" unit="°C" value={`${cityFullData.current.temp_c}`} />
                <StatsCard Icon={FaWind} iconClass="wobble" title="Wind Speed" unit="km/h" value={`${cityFullData.current.wind_kph}`} />
                <StatsCard Icon={FaWind} iconClass="wobble" title="Wind Degree" unit="deg" value={`${cityFullData.current.wind_degree}`} />
                <StatsCard Icon={FaCompass} title="Wind Direction" unit="" value={`${cityFullData.current.wind_dir}`} />
                <StatsCard Icon={FaTemperatureEmpty} iconClass="heartbeat" title="Pressure" unit="hPa" value={`${Number(cityFullData.current.pressure_mb).toLocaleString()}`} />
                <StatsCard Icon={FaWater} iconClass="vibrate" title="Humidity" unit="%" value={`${cityFullData.current.humidity}`} />
                <StatsCard Icon={FaTemperatureLow} iconClass="heartbeat" title="Feels like" unit="°C" value={`${cityFullData.current.feelslike_c}`} />
                <StatsCard Icon={FaCloud} iconClass="bounce" title="Cloud Cover" unit="%" value={`${cityFullData.current.cloud}`} />
                <StatsCard Icon={FaEye} iconClass="vibrate" title="Visibility" unit="km" value={`${cityFullData.current.vis_km}`} />
            </>
                :
                isLoading ? (<>
                    <LoadingStatCard />
                    <LoadingStatCard />
                    <LoadingStatCard />
                    <LoadingStatCard />
                    <LoadingStatCard />
                </>)
                    :
                    (
                        <>
                            <div className="failed">
                                {error && <span>{`${error?.startsWith("Error: ") ? error?.split("").splice(7).join("") : error}`}</span>}
                                {(!error || error === 'Failed to fetch weather data.') && <span>Failed to fetch weather data for {getLocationString()}, please try again later or check your internet connection.</span>}
                            </div>
                        </>
                    )
            }
        </div>
    )
}
