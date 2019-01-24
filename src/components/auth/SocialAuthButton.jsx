import React from 'react';
import SocialAuthButtons from '../presentation/socialAuth';

const { REACT_APP_GOOGLE_LOGIN, REACT_APP_FACEBOOK_LOGIN, REACT_APP_TWITTER_LOGIN } = process.env;
const socialAuthButton = () => (
  <div className="social-media-login">
    <div className="alt-auth">
      <div className="social-auth-text">
        <span className="valign-wrapper">____________OR LOGIN WITH____________</span>
      </div>
    </div>
    <div className="icon-container">
      <div>
        <SocialAuthButtons href={REACT_APP_GOOGLE_LOGIN} fontAwsomIcon="fa-google " socialMediaName="google" anchoreElementClassName="google-icon" />
      </div>
      <div>
        <SocialAuthButtons href={REACT_APP_FACEBOOK_LOGIN} fontAwsomIcon="fa-facebook-f " socialMediaName="facebook" anchoreElementClassName="facebook-icon" />
      </div>
      <div>
        <SocialAuthButtons href={REACT_APP_TWITTER_LOGIN} fontAwsomIcon="fa-twitter" socialMediaName="twitter" anchoreElementClassName="twitter-icon" />
      </div>
    </div>
  </div>
);
export default socialAuthButton;
