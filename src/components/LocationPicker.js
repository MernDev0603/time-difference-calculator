import { useState } from "react";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from "react-country-state-city";

function LocationPicker({setTime}) {

const [countryid, setCountryid] = useState(0);
const [stateid, setstateid] = useState(0);
const [timezone, setTimezone] = useState("");

const handleChange = async (lat, lng) => {
    const apiKey = process.env.REACT_APP_KEY;
    const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${Math.floor(Date.now() / 1000)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        setTimezone(data.timeZoneId);
        setTime(data.timeZoneId);
    } catch (error) {
        console.error('Error fetching timezone data:', error);
    }
}

return (
    <div className="location-item">
        <h3>Country</h3>
        <CountrySelect
            onChange={(e) => {
                setCountryid(e.id);
                handleChange(e.latitude, e.longitude);
            }}
            placeHolder="Select Country"
        />
        <h3>State</h3>
        <StateSelect
            countryid={countryid}
            onChange={(e) => {
                setstateid(e.id);
            }}
            placeHolder="Select State"
        />
        <h3>City</h3>
        <CitySelect
            countryid={countryid}
            stateid={stateid}
            onChange={(e) => {
                handleChange(e.latitude, e.longitude);
            }}
            placeHolder="Select City"
        />
        <div className="timezone">Timezone: {timezone}</div>
    </div>
);
}

export default LocationPicker;