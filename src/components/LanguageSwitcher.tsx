import { useTranslation, Language } from '@/hooks/useTranslation';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  ];

  // Verkkokauppa on vain suomeksi. Jos vaihtaa englanniksi shop-sivulla,
  // ohjaa englannin etusivulle (muuten jäisi sivulle jota ei ole EN:ksi).
  const handleSelect = (code: Language) => {
    setLanguage(code);
    if (code === 'en' && location.pathname.startsWith('/shop')) {
      navigate('/');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-white/10"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border-gray-700">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`cursor-pointer hover:bg-gray-800 ${
              language === lang.code ? 'bg-gray-800' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span className="text-white">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;