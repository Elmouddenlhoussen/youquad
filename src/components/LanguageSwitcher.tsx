
import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية', rtl: true }
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={`p-2 flex items-center ${theme === 'dark' ? 'text-sand-100 hover:text-terracotta-300' : 'text-sand-800 hover:text-terracotta-600'}`}
          aria-label="Switch language"
        >
          <Globe size={20} />
          <span className="ml-1.5 hidden md:inline">{currentLang.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={theme === 'dark' ? 'bg-sand-800 border-sand-700 text-sand-100' : ''}>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`${language.rtl ? 'text-right' : ''} ${currentLang === language.code ? (theme === 'dark' ? 'bg-sand-700' : 'bg-sand-100') : ''}`}
            onClick={() => handleLanguageChange(language.code)}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
