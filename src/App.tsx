import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { useEffect } from "react";
import { getLocation } from "./utilities";
import { useLocation } from "./store/Location";
import { useSearch } from "./store/Search";
import { LocalStorageToolkit } from "./utilities/localStorage";
import { WORLD_CITIES } from "./constants/WorldCities";
import { useMyWorldCities } from "./store/myWorldCities";
import Details from "./pages/Details";
import { useMyFavoriteCities } from "./store/myFavoriteCities";
import { useMyNotes } from "./store/myNotes";
import Modal from "./components/Notes/Modal";
import { AnimatePresence } from "framer-motion";
import { Note } from "./types";

export default function App() {
    const { setSelectedCity } = useSearch();
    const { setHasPermissionLocation, setHasError, setLocation } = useLocation();
    const { setMyWorldCities } = useMyWorldCities();
    const { setMyFavoriteCities } = useMyFavoriteCities();
    const { noteModalOpen, populateNotes } = useMyNotes();


    useEffect(() => {
        getLocation().then(([location, error]) => {
            if (error) {
                setHasError(true, error);
                console.error("Error:", error);
            } else {
                const getPreviousLocation = LocalStorageToolkit.getItem("user-location");

                setHasPermissionLocation(true);
                setLocation({
                    city: location?.city ?? "",
                    country: location?.country ?? "",
                    state: location?.state ?? "",
                    formatted: location?.formatted ?? ""
                });

                setSelectedCity(location?.formatted ? `${location?.city || ""}, ${location?.state || ""}` : "");
                LocalStorageToolkit.setItem("user-location", {
                    city: location?.city ?? "",
                    country: location?.country ?? "",
                    state: location?.state ?? "",
                    formatted: location?.formatted ?? ""
                });
                if (!getPreviousLocation) window.location.href = `/details?query=${location?.formatted}`;
            }
        });

        let myWorldCities = LocalStorageToolkit.getItem("my-world-cities") as { city: string; country: string }[] | null;
        const myFavoriteCities = LocalStorageToolkit.getItem("my-favorite-cities") as { city: string; country: string }[] | null;
        const myNotes = LocalStorageToolkit.getItem("my-notes") as Note[] | null;

        if (!myWorldCities) {
            LocalStorageToolkit.setItem("my-world-cities", WORLD_CITIES);
            myWorldCities = WORLD_CITIES;
        }

        setMyWorldCities(myWorldCities);

        if (myFavoriteCities) {
            setMyFavoriteCities(myFavoriteCities);
        }

        if (myNotes) {
            populateNotes(myNotes);
        }
    }, []);

    return (
        <div className="app" data-testid="app">
            <AnimatePresence>
                {noteModalOpen && <Modal />}
            </AnimatePresence>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/details" element={<Details />} />
                </Routes>
            </BrowserRouter>

            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <filter id="lensFilter" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
                    {/* Create alpha channel for displacement */}
                    <feComponentTransfer in="SourceAlpha" result="alpha">
                        <feFuncA type="identity" />
                    </feComponentTransfer>

                    {/* Blur for smooth displacement */}
                    <feGaussianBlur in="alpha" stdDeviation="40" result="blur" />

                    {/* Top displacement - push content down */}
                    <feOffset in="blur" dx="0" dy="-30" result="topBlur" />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="topBlur"
                        scale="60"
                        xChannelSelector="A"
                        yChannelSelector="A"
                        result="topDisplace"
                    />

                    {/* Bottom displacement - push content up */}
                    <feOffset in="blur" dx="0" dy="30" result="bottomBlur" />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="bottomBlur"
                        scale="60"
                        xChannelSelector="A"
                        yChannelSelector="A"
                        result="bottomDisplace"
                    />

                    {/* Blend both displacements */}
                    <feBlend mode="normal" in="topDisplace" in2="bottomDisplace" />
                </filter>
            </svg>
        </div >
    )
}