import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-4 pb-4" style={{ backgroundColor: '#111726' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-gray-400 text-xs">{t('footer.copyright')}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
