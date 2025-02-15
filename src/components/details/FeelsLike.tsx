import { FaTemperatureHigh } from "react-icons/fa6";
import StatCard from "../global components/StatCard";
import { useMyCurrentLocation } from '../../store/weather data/myCurrentLocation';
import LoadingStatCard from "../global components/LoadingStatCard";


export default function FeelsLike() {
    const { weatherData, status } = useMyCurrentLocation();

    return (
        status === "success" ?
            !weatherData || !weatherData.current ? <>{null}</> :
                <StatCard>
                    <p className="title">Feels like</p>
                    <div className="row">
                        <div className="info">
                            <div className="icon"><FaTemperatureHigh /></div>
                            <div className="stat">
                                <span className="value">{weatherData.current.feelslike}<sup>o</sup></span>
                            </div>
                        </div>
                    </div>
                </StatCard>
            :
            <LoadingStatCard />
    )
}
