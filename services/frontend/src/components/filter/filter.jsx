import React, {useState, useEffect} from 'react';
import './filter.scss';
import sectorService from '../../services/SectorService';
import jobService from '../../services/JobService';
import { Link } from 'react-router-dom';

export default function filter() {
  const [sectorJobCount, setSectorJobCount] = useState([]);
  const [locationJobCount, setLocationJobCount] = useState([]);

  const { fetchSectorJobCount } = sectorService();
  const { fetchLocationJobCount } = jobService();

  const fetchSectorJobCountData = async () => {
    await fetchSectorJobCount((res) => {
      setSectorJobCount(res.data);
    });
  }

  const fetchLocationJobCountData = async () => {
    await fetchLocationJobCount((res) => {
      setLocationJobCount(res.data);
    });
  }

  useEffect(() => {
    fetchSectorJobCountData();
    fetchLocationJobCountData();
  }, []);

  return (
    <div className="filter">
      <div className="filter__links">
        <h1>Browse by sector</h1>
        <ul>
          {sectorJobCount.map((sector) => (
            <li key={sector.id}>
              <Link to={`/browse-by-sector/${sector.id}`}>
                {sector.title} <span>({sector.totalJobCount})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter__links">
        <h1>Browse by location</h1>
        <ul>
          {locationJobCount.map((item, index) => (
            <li key={index}>
              <Link to={`/browse-by-location/${item.location}`}>
                Jobs in {item.location} <span>({item.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
