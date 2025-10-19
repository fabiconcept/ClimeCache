import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/details/HeaderComponent";
import TopCard from "../components/details/TopCard";
import StatsTray from "../components/details/StatsTray";
import Notes from "../components/details/Notes";
import { useMyNotes } from "../store/myNotes";
import DailyForecast from "../components/details/DailyForecast";

const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
};
export default function Details() {
    const queryParams = useQueryParams();
    const navigate = useNavigate();
    const { setNoteModalOpen } = useMyNotes();

    if (!queryParams.get("query")) {
        navigate("/");
    }

    const type = queryParams.get("type");
    const query = queryParams.get("query") || "";
    const note = queryParams.get("note") || "";

    const param = useMemo(() => {
        const [city, country] = query.split(", ");
        if (type === "known") {
            return {
                knownCity: { city, country }
            }
        } else {

            return {
                knownCity: { city: "", country: "" },
                unknownCity: query,
                myLocation: type === "my-location"
            }
        }
    }, [query, type, setNoteModalOpen]);

    useEffect(() => {
        if (!note) return;

        setNoteModalOpen(true, note);
    }, [note])

    return (
        <div className="home">
            <HeaderComponent />
            <TopCard param={param} />
            <StatsTray param={param} />
            <DailyForecast param={param} />
            <Notes param={param} />
        </div>
    )
}