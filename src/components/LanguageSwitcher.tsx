
import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦', rtl: true }
];

const LanguageSwitcher: React.FC = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const { theme } = useTheme();

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    
    // In a full implementation, this would update the app's language
    const isRtl = languages.find(lang => lang.code === langCode)?.rtl;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
    
    // If using RTL language, add RTL class to body
    if (isRtl) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button 
          className={`p-2 flex items-center rounded-full ${theme === 'dark' ? 'text-sand-100 hover:bg-sand-700' : 'text-sand-800 hover:bg-sand-100'}`}
          aria-label="Switch language"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe size={20} className="mr-1.5" />
          <span className="text-sm font-medium hidden md:inline">{getCurrentLanguage()?.flag} {currentLang.toUpperCase()}</span>
          <span className="text-sm font-medium md:hidden">{getCurrentLanguage()?.flag}</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`p-2 ${theme === 'dark' ? 'bg-sand-800 border-sand-700 text-sand-100' : ''}`}
      >
        {languages.map((language) => {
          const isActive = currentLang === language.code;
          return (
            <DropdownMenuItem
              key={language.code}
              className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer ${
                language.rtl ? 'text-right' : ''
              } ${
                isActive 
                  ? theme === 'dark' 
                    ? 'bg-sand-700 text-white' 
                    : 'bg-sand-100 text-sand-800' 
                  : ''
              } ${
                theme === 'dark' 
                  ? 'hover:bg-sand-700 focus:bg-sand-700' 
                  : 'hover:bg-sand-100 focus:bg-sand-100'
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <div className="flex items-center">
                <span className="text-base mr-2">{language.flag}</span>
                <span>{language.name}</span>
              </div>
              {isActive && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
