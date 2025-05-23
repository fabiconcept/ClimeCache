export interface HeaderButtonProps {
    iconSource: string,
    counter?: number,
    onClick: () => void,
    tooltip: string,
    active?: boolean,
    text?: string,
    isSelected?: boolean,
    favoriteBtn?: {
        isFavourite: boolean,
        altIconSource: string
    }
}

interface RequestParamsWIthDefaultUrl {
    defaultUrl: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
    headers?: HeadersInit;
}

interface RequestPropsWIthEndpoint {
    defaultUrl?: undefined;
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
    headers?: HeadersInit;
}

export type RequestParams = RequestParamsWIthDefaultUrl | RequestPropsWIthEndpoint

export interface Country {
    capital: string;
    code: string;
    continent: string;
    flag_image: string;
    flag_4x3: string;
    iso: boolean;
    name: string;
}


export type Param = {
    knownCity: {
        city: string;
        country: string;
    };
    unknownCity?: undefined;
    myLocation?: undefined;
} | {
    knownCity: {
        city: string;
        country: string;
    };
    unknownCity: string;
    myLocation: boolean;
}

export interface Note {
    id: string,
    title: string,
    attachedLocation: {
        city: string,
        country: string
    },
    text: string,
    timestamp: number
}