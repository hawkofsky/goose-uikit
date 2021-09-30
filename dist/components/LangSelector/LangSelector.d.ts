import React from "react";
import { Colors } from "../../theme";
import { Language } from "./types";
import { Position } from "../Dropdown/types";
import { Sizes } from "../Button/types";
interface Props {
    currentLang: string;
    langs: Language[];
    setLang: (lang: Language) => void;
    color: keyof Colors;
    dropdownPosition?: Position;
    buttonSize?: Sizes;
    hideLanguage?: boolean;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
