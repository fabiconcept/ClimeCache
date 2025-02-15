import { Param } from "@/types";
import "../../styles/DailyForecast.css";
import { useCurrentWeather } from "../../utilities/Hooks/useCurrentWeather";
import { getDayOfWeek, getSuffix } from "../../utilities";

export default function DailyForecast({ param }: { param: Param }) {
    const [isLoading, _, cityFullData] = useCurrentWeather(param);

    if (isLoading || !cityFullData || !cityFullData.forecast) return null;




    return (
        <section className="forecast-container">
            <p className="title">Next {cityFullData.forecast.forecastday.length} days <span>({cityFullData.forecast.forecastday.length})</span></p>
            <div className="forecasts">
                {cityFullData.forecast.forecastday.map((day, index) => (
                    <div className="card" key={index}>
                        <div className="label">
                            <span>{getDayOfWeek(day.date)} <span className="lite">{day.date.split("").splice(8).join("")}{getSuffix(day)}</span></span>
                        </div>
                        <img src={day.day.condition.icon} alt="" />
                        <span className="feelslike">{day.day.maxtemp_c}<sup>°C</sup></span>
                    </div>
                ))}
            </div>
        </section>
    )
}
