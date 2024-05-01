import './App.css';
import "react-country-state-city/dist/react-country-state-city.css";

import LocationPicker from './components/LocationPicker';
import { useState } from 'react';

const moment = require('moment-timezone');

function getTimeDifference(fromTimeZone, toTimeZone) {
  const format = 'YYYY-MM-DD HH:mm:ss';

  const fromTime = moment.tz(fromTimeZone).format(format);
  const toTime = moment.tz(toTimeZone).format(format);
  const now = moment();

  // const diff = moment.tz(toTime, toTimeZone).diff(moment.tz(fromTime, fromTimeZone), 'hours');
  const offset1 = moment.tz.zone(fromTimeZone).utcOffset(now);
  const offset2 = moment.tz.zone(toTimeZone).utcOffset(now);

  const offsetDifference = (offset1 - offset2) / 60;

  return {
    time1: fromTime,
    time2: toTime,
    diff: offsetDifference
  };
}

function App() {

  const [timezone1, setTimezone1] = useState("America/New_York");
  const [timezone2, setTimezone2] = useState("America/New_York");

  const { time1, time2, diff } = getTimeDifference(timezone1, timezone2);

  return (
    <div className="App">
      <div className='container'>
        <div className='location'>
          <LocationPicker setTime={setTimezone1}/>
          <LocationPicker setTime={setTimezone2}/>
        </div>
        <div className='result'>
          {`Current time in ${timezone1}: ${time1}`} <br/>
          {`Current time in ${timezone2}: ${time2}`} <br/>
          <br/>
          {`Time difference: ${diff} hours`}
        </div>
      </div>
    </div>
  );
}

export default App;
