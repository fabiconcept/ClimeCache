import { useRef } from "react";
import { useClickAway } from "react-use";
import { motion } from "framer-motion";
import { FaSun, FaBrush } from "react-icons/fa6";
import { useMyWorldCities } from "../../store/myWorldCities";
import { useMyFavoriteCities } from "../../store/myFavoriteCities";
import clsx from "clsx";

export default function SettingsMenu({ closeMenu }: { closeMenu: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    useClickAway(containerRef, () => closeMenu());
    const { reset,  } = useMyWorldCities();
    const { clearFavourites, myFavoriteCities } = useMyFavoriteCities();

    return (
        <motion.div
            className="settings-menu"
            ref={containerRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <span className="title">Settings</span>
            <div className={clsx("settings-menu-content")} onClick={() => reset()}>
                <div className="title">
                    <FaBrush />
                    Reset World Cities
                </div>
            </div>
            <div className={clsx(
                "settings-menu-content",
                myFavoriteCities.length === 0 && "disabled"
            )} onClick={() => myFavoriteCities.length > 0 && clearFavourites()}>
                <div className="title">
                    <FaBrush />
                    Clear Favorite Cities
                </div>
            </div>
            <div className="settings-menu-content">
                <div className="row coming-soon">
                    <div className="title">
                        <FaSun />
                        Switch to Dark Mode
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
