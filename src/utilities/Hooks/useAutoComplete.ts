import { useEffect, useState } from "react";
import { WeatherApi } from "../WeatherApi";
import { useAutocomplete } from "../../store/Autocomplete";
import { useSearch } from "../../store/Search";

export const useAutocompleteHook = ({ searchTerm }: { searchTerm: string }): [boolean] => {
    const [loading, setLoading] = useState(false);
    const { selectedCity } = useSearch();

    const { setAutocomplete, clear } = useAutocomplete();


    useEffect(() => {
        if (searchTerm === selectedCity) return;

        (async () => {
            try {
                clear();
                setLoading(true);
                const weatherAPI = new WeatherApi();

                const response = await weatherAPI.getAutocomplete(searchTerm);
                const { features } = response;

                const possibilities = features.splice(0, 5).map((feature) => {
                    return feature.properties.formatted;
                });

                setAutocomplete(possibilities);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })()

    }, [searchTerm])

    return [loading];
}