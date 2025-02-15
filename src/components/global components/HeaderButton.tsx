import { HeaderButtonProps } from "../../types";
import "../../styles/header-component.css";
import clsx from "clsx";

export default function HeaderButton({ active = true, ...props }: HeaderButtonProps) {
    return (
        <div role="banner" className={clsx(
            "header-button-wrapper",
            props.isSelected && "selected",
        )}>
            {!!props.counter && <div className="counter">{props.counter > 9 ? "9+" : props.counter}</div>}
            <button
                className={clsx(
                    "header-button",
                    !active && "deactived",
                    props.text && "text"
                )}
                onClick={active ? props.onClick : () => { }}
                title={props.tooltip}
            >
                {props.text && <span>{props.text}</span>}
                {!props.text && <img src={props.favoriteBtn?.isFavourite ? props.favoriteBtn?.altIconSource : props.iconSource} className={!props.favoriteBtn ? "switch-light-mode" : ""} alt="" />}
            </button>
        </div >
    )
}
