import { AnimatePresence } from "framer-motion";
import { useHeaderMenu } from "../../store/HeaderMenu";
import { useMyNotes } from "../../store/myNotes";
import "../../styles/header-component.css";
import HeaderButton from "../global components/HeaderButton";
import MenuNotes from "../global components/MenuNotes";
import SearchComponent from "../global components/SearchComponent";
import SettingsMenu from "../global components/SettingsMenu";

export default function HeaderComponent() {
    const { myNotes } = useMyNotes();
    const { isNotesMenuOpen, isSettingsMenuOpen, toggleNotesMenu, toggleSettingsMenu } = useHeaderMenu();
    return (
        <div className="header-component">
            <SearchComponent />
            <div className="btns">
                <HeaderButton
                    active={myNotes?.length > 0}
                    isSelected={isNotesMenuOpen}
                    iconSource="/assets/images/notes.png"
                    onClick={toggleNotesMenu}
                    counter={myNotes?.length}
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
