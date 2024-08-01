import React from 'react';

const SocialLink = ({ icon, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt="social-icon" className="w-8 h-8 object-contain cursor-pointer" />
    </a>
  );
};

export default SocialLink;
