export interface AutocompleteResponse {
    type: 'FeatureCollection';
    features: Feature[];
    query: {
        text: string;
        parsed: {
            city: string;
            expected_type: string;
        };
    };
}

interface Feature {
    type: 'Feature';
    properties: {
        datasource: {
            sourcename: string;
            attribution: string;
            license: string;
            url: string;
        };
        country: string;
        country_code: string;
        state?: string;
        county?: string;
        city: string;
        postcode?: string;
        lon: number;
        lat: number;
        result_type: string;
        formatted: string;
        address_line1: string;
        address_line2: string;
        county_code?: string;
        category: string;
        timezone: {
            name: string;
            offset_STD: string;
            offset_STD_seconds: number;
            offset_DST: string;
            offset_DST_seconds: number;
            abbreviation_STD: string;
            abbreviation_DST: string;
        };
        plus_code: string;
        plus_code_short?: string;
        rank: {
            importance: number;
            confidence: number;
            confidence_city_level: number;
            match_type: string;
        };
        place_id: string;
    };
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
    bbox: [number, number, number, number];
}

export interface ReverseGeocodingResponse {
    results: NominatimResult[];
    query: {
        lat: number;
        lon: number;
        plus_code: string;
    };
}

export interface NominatimResult {
    datasource: {
        sourcename: string;
        attribution: string;
        license: string;
        url: string;
    };
    name: string;
    ref: string;
    country: string;
    country_code: string;
    state?: string;
    county?: string;
    city: string;
    postcode?: string;
    street: string;
    lon: number;
    lat: number;
    distance: number;
    result_type: string;
    formatted: string;
    address_line1: string;
    address_line2: string;
    timezone: {
        name: string;
        offset_STD: string;
        offset_STD_seconds: number;
        offset_DST: string;
        offset_DST_seconds: number;
        abbreviation_STD: string;
        abbreviation_DST: string;
    };
    plus_code: string;
    plus_code_short: string;
    rank: {
        importance: number;
        popularity: number;
    };
    place_id: string;
    bbox: {
        lon1: number;
        lat1: number;
        lon2: number;
        lat2: number;
    };
}
