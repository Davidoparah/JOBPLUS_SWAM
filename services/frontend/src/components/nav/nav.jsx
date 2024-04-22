import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useCookie } from '../../hooks/useCookie';
import { useSavedJobCount } from '../../contexts/SavedJobCountContext';
import notifyService from '../../services/NotifyService';

import {
  Hamburger,
  Magnify,
  NotifyActive,
  Notify,
  Saved,
  Profile,
  Exit,
} from '../images';

import './nav.scss';

export default function nav() {
  const { deleteAuthCookie } = useCookie();
  const { savedJobCount } = useSavedJobCount();
  const [notifyCount, setNotifyCount] = useState(0);
  const { getNotifyJobsCount } = notifyService();

  const getNotifyJobsCountData = async () => {
    await getNotifyJobsCount((res) => {
      setNotifyCount(res.data);
    });
  };

  useEffect(() => {
    getNotifyJobsCountData();
  }, []);

  return (
    <nav className="nav">
      <input type="checkbox" className="nav__toggle" id="hamburger" hidden />
      <ul className="nav__lblock">
        <li className="nav__hamburger">
          <label htmlFor="hamburger">
            <img src={Hamburger} alt="" />
          </label>
        </li>
        <li className="nav__logo">
          <Link to="/">JOBPLUS</Link>
        </li>
      </ul>

      <ul className="nav__icons">
        <li>
          <Link to="/listings">
            <img src={Magnify} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/notified-jobs">
            { notifyCount > 0 ? (
              <img src={NotifyActive} alt="" />
            ) : (
              <img src={Notify} alt="" />
            )}
          </Link>
        </li>
        <li>
          <Link to="/saved-jobs">
            <img src={Saved} alt="" />
            <span className="nav__savedcount">{ savedJobCount }</span>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img src={Profile} alt="" />
          </Link>
        </li>
        <li>
          <Link to="/login" onClick={deleteAuthCookie}>
            <img src={Exit} alt="" />
          </Link>
        </li>
      </ul>

      <ul className="nav__dropl">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/listings">
          <li>Job listing</li>
        </Link>
        <Link to="/applications">
          <li>Job applications</li>
        </Link>
      </ul>
    </nav>
  );
}
