import React from "react";
import { useTranslation } from 'react-i18next';
import { BASE_URL } from "../contexts/index";

const socialIcon = `${BASE_URL}Social_icon_01.png`;
const socialIcon1 = `${BASE_URL}Social_icon_02.png`;
const socialIcon2 = `${BASE_URL}Social_icon_03.png`;
const socialIcon3 = `${BASE_URL}Social_icon_04.png`;
const socialIcon4 = `${BASE_URL}Social_icon_05.png`;
const socialIcon5 = `${BASE_URL}Social_icon_06.png`;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="pt-4 pb-4" style={{ backgroundColor: "#111726" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          {/* Copyright */}
          <p className="text-gray-400 text-xs">{t('footer.copyright')}</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <img
              src={socialIcon}
              alt="Twitter"
              className="w-4 h-4 opacity-70"
            />
            <img
              src={socialIcon1}
              alt="LinkedIn"
              className="w-4 h-4 opacity-70"
            />
            <img
              src={socialIcon2}
              alt="Facebook"
              className="w-4 h-4 opacity-70"
            />
            <img
              src={socialIcon3}
              alt="GitHub"
              className="w-4 h-4 opacity-70"
            />
            <img src={socialIcon4} alt="Peace" className="w-4 h-4 opacity-70" />
            <img
              src={socialIcon5}
              alt="Dribbble"
              className="w-4 h-4 opacity-70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
