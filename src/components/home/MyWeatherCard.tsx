import { FaArrowRightLong } from 'react-icons/fa6';
import '../../styles/MyWeatherCard.css';
import FeelsLike from './FeelsLike';
import WindSpeed from './WindSpeed';
import Humidity from './Humidity';
import { useLocation } from '../../store/Location';
import { useMyCurrentLocation } from '../../store/weather data/myCurrentLocation';
import { useEffect, useMemo } from 'react';
import LoadingStatCard from '../global components/LoadingStatCard';
import { useNavigate } from 'react-router-dom';

export default function MyWeatherCard() {
    const { hasPermissionLocation, location } = useLocation();
    const { loadMyWeatherData, weatherData, error } = useMyCurrentLocation();
    const navigate = useNavigate();

    const memoisedLocation = useMemo(() => location, [location]);

    useEffect(() => {
        if (memoisedLocation?.formatted) {
            loadMyWeatherData(memoisedLocation.formatted);
        }
    }, [memoisedLocation, loadMyWeatherData]);

    return (
        <div className="container">
            {hasPermissionLocation ?
                <>
                    <div className='details'>
                        <p>Your current location</p>
                        <h1 onClick={() => navigate(`/details?query=${location?.formatted}&type=my-location`)}>
                            <p>{location?.formatted} <span><FaArrowRightLong /></span></p>
                        </h1>
                    </div>

                    <div className="stats">
                        {weatherData && weatherData.current ?
                            <>
                                <FeelsLike />
                                <WindSpeed />
                                <Humidity />
                            </>
                            :
                            <span className='error'>{`${error?.startsWith("Error: ") ? error?.split("").splice(7).join("") : error}`}</span>
                        }
                    </div>
                </>
                :
                <>
                    <LoadingStatCard />
                </>
            }
        </div>
    )
}
