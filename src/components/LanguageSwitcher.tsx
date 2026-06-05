import { useTranslation, Language } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buildLangUrl } from '@/lib/i18n-routing';

const LanguageSwitcher = () => {
  const { language } = useTranslation();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  // Kielen vaihto siirtää oikean kielen URL:iin (suomi juureen, englanti /en).
  // Täysi navigointi, jotta React Routerin basename asettuu uudelleen.
  const handleSelect = (code: Language) => {
    if (code === language) return;
    localStorage.setItem('lucky-discs-language', code);
    window.location.assign(buildLangUrl(code, window.location.pathname, window.location.search));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/10">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border-gray-700">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`cursor-pointer hover:bg-gray-800 ${language === lang.code ? 'bg-gray-800' : ''}`}
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
