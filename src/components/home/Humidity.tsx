import { FaDroplet } from "react-icons/fa6";
import StatCard from "../global components/StatCard";
import { useMyCurrentLocation } from "../../store/weather data/myCurrentLocation";
import LoadingStatCard from "../global components/LoadingStatCard";

export default function Humidity() {
    const { weatherData, status } = useMyCurrentLocation();

    return (
        status === "success" ?
            !weatherData || !weatherData.current ? <>{"An error occurred while fetching weather data."}</> :
                <StatCard>
                    <p className="title">Humidity</p>
                    <div className="row">
                        <div className="info">
                            <div className="icon"><FaDroplet /></div>
                            <div className="stat">
                                <span className="value">{weatherData.current.humidity}<span>%</span></span>
                            </div>
                        </div>
                    </div>
                </StatCard>
            :
            <LoadingStatCard />
    )
}
