import { useNavigate } from "react-router-dom";
import "../../styles/header-component.css";
import HeaderButton from "../global components/HeaderButton";
import SearchComponent from "../global components/SearchComponent";
import { useMyNotes } from "../../store/myNotes";
import { useHeaderMenu } from "../../store/HeaderMenu";
import { AnimatePresence } from "framer-motion";
import MenuNotes from "../global components/MenuNotes";
import SettingsMenu from "../global components/SettingsMenu";


export default function HeaderComponent() {
    const { myNotes } = useMyNotes();
    const { isNotesMenuOpen, isSettingsMenuOpen, toggleNotesMenu, toggleSettingsMenu } = useHeaderMenu();

    const navigate = useNavigate();

    return (
        <div className="header-component">
            <HeaderButton active={true} iconSource="/assets/images/arrow-back.png" onClick={() => navigate(-1)} tooltip="Back" />
            <SearchComponent />
            <div className="btns">
                <HeaderButton
                    active={myNotes.length > 0}
                    isSelected={isNotesMenuOpen}
                    iconSource="/assets/images/notes.png"
                    onClick={toggleNotesMenu}
                    counter={myNotes.length}
                    tooltip="My Notes"
                />
                <HeaderButton
                    isSelected={isSettingsMenuOpen}
                    active={true}
                    iconSource="/assets/images/settings.png"
                    onClick={toggleSettingsMenu}
                    tooltip="Settings"
                />
            </div>
            <AnimatePresence>
                {isNotesMenuOpen && <MenuNotes closeMenu={toggleNotesMenu} />}
            </AnimatePresence>
            <AnimatePresence>
                {isSettingsMenuOpen && <SettingsMenu closeMenu={toggleSettingsMenu} />}
            </AnimatePresence>
        </div>
    )
}
