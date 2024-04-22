import React, {useState, useEffect} from 'react'
import './cookie.scss'

import { CookieClose } from '../images'
import cookie from 'js-cookie'

const COOKIE_BANNER_KEY = 'cookie-banner-closed';

export default function CookieBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  const handleClose = () => {
    setIsBannerVisible(false);
    cookie.set(COOKIE_BANNER_KEY, 'true', { expires: 365 }); // expires in 365 days
  };

  useEffect(() => {
    const isClosed = cookie.get(COOKIE_BANNER_KEY);
    if (isClosed) {
      setIsBannerVisible(false);
    }
  }, []);

  if (!isBannerVisible) return null;

  return (
    <div className="cookie">
      <p>
        Jobplus uses cookies. By continuing you are agreeing to
        our use of cookies. <a href="">Learn more</a>.
      </p>
      <img src={CookieClose} alt="" onClick={handleClose}/>
    </div>
  )
}
