import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.discs': 'Discs',
    'nav.wholesale': 'Wholesale',
    'nav.brand': 'Brand',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    'nav.getWholesaleAccess': 'Get Wholesale Access',
    
    // Hero Section
    'hero.modernDiscs': 'MODERN DISCS.',
    'hero.wildStyle': 'WILD STYLE.',
    'hero.luckyThrows': 'LUCKY THROWS.',
    'hero.subtitle': 'Premium disc golf equipment designed with style and engineered for power. For players who want to stand out and perform at their best.',
    'hero.whatAreYouLookingFor': 'What are you looking for?',
    'hero.wholesaleDescription': 'Wholesale: Become a retailer',
    'hero.discsDescription': 'Discs: Browse our collection',
    'hero.teamDescription': 'Team: Meet our players',
    'hero.brandDescription': 'Brand: Our story',
    'hero.getWholesaleAccess': 'Get Wholesale Access',
    'hero.exploreOurDiscs': 'Explore Our Discs',
    'hero.ourTeam': 'Our Team',
    'hero.ourStory': 'Our Story',
    'hero.contact': 'Contact',
    
    // Featured Products
    'featured.title': 'Featured Discs',
    'featured.subtitle': 'Discover our most popular disc models, each crafted with premium materials and distinctive designs that set you apart on the course.',
    'featured.viewAllDiscs': 'View All Discs',
    
    // Disc descriptions
    'disc.bankRobber.description': 'A high-speed driver with unmatched stability for power throwers.',
    'disc.treasureHunt.description': 'Mid-range disc with excellent glide and reliable fade.',
    'disc.moneyShot.description': 'Our signature putter with incredible grip and accuracy.',
    'disc.jailbreak.description': 'Break free from conventional throws with this revolutionary disc. Flight numbers classified.',
    
    // Action Section
    'action.title': 'Lucky Discs in Action',
    'action.subtitle': 'From professional tournaments to weekend rounds - see our discs perform when precision and reliability matter most.',
    'action.tournamentPlay': 'Tournament Play',
    'action.professionalPrecision': 'Professional precision',
    'action.elitePerformance': 'Elite Performance',
    'action.championshipLevel': 'Championship level play',
    'action.worldChampionship': 'World Championship',
    'action.globalCompetition': 'Global competition',
    'action.professionalAction': 'Professional Action',
    'action.tournamentHighlights': 'Tournament highlights',
    'action.performanceUnderPressure': 'Performance Under Pressure',
    'action.performanceDescription': 'When every throw matters, Lucky Discs deliver the consistency and reliability that professional players demand. From crucial putts to game-winning drives, our discs perform when it counts most.',
    'action.shopTournamentDiscs': 'Shop Tournament Discs',
    'action.meetOurTeam': 'Meet Our Team',
    
    // Features
    'features.title': 'Why Choose Lucky Discs',
    'features.subtitle': "We're dedicated to creating premium disc golf equipment that performs as good as it looks.",
    'features.premiumMaterials': 'Premium Materials',
    'features.premiumMaterialsDesc': 'All our discs are made with high-quality polymers for superior durability and consistent flight.',
    'features.fastShipping': 'Fast Shipping',
    'features.fastShippingDesc': 'We ship worldwide with reliable tracking and secure packaging for your discs.',
    'features.tournamentTested': 'Tournament Tested',
    'features.tournamentTestedDesc': 'Our discs are tournament-approved and used by professional players worldwide.',
    'features.communitySupport': 'Community Support',
    'features.communitySupportDesc': 'We actively sponsor events and players to grow the sport of disc golf globally.',
    
    // CTA Section
    'cta.title': 'Ready to Stock Lucky Discs?',
    'cta.subtitle': 'Join our network of retailers and offer your customers premium disc golf equipment with unique style.',
    'cta.applyForWholesale': 'Apply for Wholesale Access',
    
    // Footer
    'footer.description': 'Premium disc golf equipment with wild style and exceptional performance. Lucky Discs - bringing luck to your game.',
    'footer.quickLinks': 'Quick Links',
    'footer.discGuide': 'Disc Guide',
    'footer.contactInfo': 'Contact Info',
    'footer.email': 'Email:',
    'footer.location': 'Location:',
    'footer.businessType': 'Business Type:',
    'footer.specialty': 'Speciality:',
    'footer.businessTypeValue': 'Premium Disc Golf Equipment',
    'footer.specialtyValue': 'Modern Discs • Wild Style • Lucky Throws',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDescription': 'Subscribe to get special offers, free giveaways, and product launches.',
    'footer.thanksForSubscribing': 'Thanks for subscribing! 🍀',
    'footer.checkEmailConfirmation': 'Check your email for confirmation',
    'footer.yourEmail': 'Your email',
    'footer.allRightsReserved': 'All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    
    // 404 Page
    'notFound.title': 'Page Not Found',
    'notFound.description': 'The page you are looking for could not be found. Get to know our team captain or check out our products.',
    'notFound.readAboutDaniel': 'Learn About Daniel',
    'notFound.exploreProducts': 'Explore Products',
  },
  fi: {
    // Navbar
    'nav.home': 'Etusivu',
    'nav.discs': 'Kiekot',
    'nav.wholesale': 'Tukkukauppa',
    'nav.brand': 'Brändi',
    'nav.team': 'Tiimi',
    'nav.contact': 'Yhteystiedot',
    'nav.getWholesaleAccess': 'Hanki tukkukaupan pääsy',
    
    // Hero Section
    'hero.modernDiscs': 'MODERNIT KIEKOT.',
    'hero.wildStyle': 'VILLI TYYLI.',
    'hero.luckyThrows': 'ONNEKKAITA HEITTOJA.',
    'hero.subtitle': 'Premium frisbee golf -varusteet, jotka on suunniteltu tyylillä ja suunniteltu tehoon. Pelaajille, jotka haluavat erottua ja suoriutua parhaimmillaan.',
    'hero.whatAreYouLookingFor': 'Mitä etsit?',
    'hero.wholesaleDescription': 'Tukkukauppa: Ryhdy jälleenmyyjäksi',
    'hero.discsDescription': 'Kiekot: Selaa valikoimaamme',
    'hero.teamDescription': 'Tiimi: Tutustu pelaajiin',
    'hero.brandDescription': 'Brändi: Meidän tarina',
    'hero.getWholesaleAccess': 'Hanki tukkukaupan pääsy',
    'hero.exploreOurDiscs': 'Tutustu kiekkoihimme',
    'hero.ourTeam': 'Tiimimme',
    'hero.ourStory': 'Tarinämme',
    'hero.contact': 'Yhteystiedot',
    
    // Featured Products
    'featured.title': 'Suositut kiekot',
    'featured.subtitle': 'Tutustu suosituimpiin kiekkomalleihimme, joista jokainen on valmistettu premium-materiaaleista ja erottuvilla design-ratkaisuilla.',
    'featured.viewAllDiscs': 'Katso kaikki kiekot',
    
    // Disc descriptions
    'disc.bankRobber.description': 'Nopea driver, joka tarjoaa vertaansa vailla olevaa vakautta tehonheittäjille.',
    'disc.treasureHunt.description': 'Keskietäisyyden kiekko erinomaisella liidolla ja luotettavalla fadella.',
    'disc.moneyShot.description': 'Meidän erikoisputter uskomattomalla otteella ja tarkkuudella.',
    'disc.jailbreak.description': 'Murra vapaa perinteisistä heitoista tällä vallankumouksellisella kiekolla. Lentoluvut salassa.',
    
    // Action Section
    'action.title': 'Lucky Discs toiminnassa',
    'action.subtitle': 'Ammattilaisturnauksista viikonloppukierroksiin - katso kuinka kiekkomme suoriutuvat kun tarkkuus ja luotettavuus on tärkeintä.',
    'action.tournamentPlay': 'Turnauspelausta',
    'action.professionalPrecision': 'Ammattilaisten tarkkuutta',
    'action.elitePerformance': 'Huippusuoritusta',
    'action.championshipLevel': 'Mestaruustason peliä',
    'action.worldChampionship': 'Maailmanmestaruus',
    'action.globalCompetition': 'Maailmanlaajuista kilpailua',
    'action.professionalAction': 'Ammattilaisaktiota',
    'action.tournamentHighlights': 'Turnauskohokohtia',
    'action.performanceUnderPressure': 'Suoritusta paineen alla',
    'action.performanceDescription': 'Kun jokainen heitto merkitsee, Lucky Discs tarjoaa johdonmukaisuuden ja luotettavuuden, jota ammattilaispelaajat vaativat. Ratkaisevista puteista voittoisiin drivereihin, kiekkamme suoriutuvat kun se on tärkeintä.',
    'action.shopTournamentDiscs': 'Osta turnauskiekkoja',
    'action.meetOurTeam': 'Tutustu tiimiimme',
    
    // Features
    'features.title': 'Miksi valita Lucky Discs',
    'features.subtitle': 'Olemme omistautuneet luomaan premium frisbee golf -välineitä, jotka suoriutuvat yhtä hyvin kuin näyttävät.',
    'features.premiumMaterials': 'Premium materiaalit',
    'features.premiumMaterialsDesc': 'Kaikki kiekkomme on valmistettu korkealaatuisista polymeereistä paremman kestävyyden ja johdonmukaisen lennon varmistamiseksi.',
    'features.fastShipping': 'Nopea toimitus',
    'features.fastShippingDesc': 'Toimitamme maailmanlaajuisesti luotettavalla seurannalla ja turvallisella pakkauksella kiekoillesi.',
    'features.tournamentTested': 'Turnaustestattua',
    'features.tournamentTestedDesc': 'Kiekkomme on turnaushyväksyttyjä ja ammattilaispelaajat käyttävät niitä maailmanlaajuisesti.',
    'features.communitySupport': 'Yhteisön tuki',
    'features.communitySupportDesc': 'Sponsoroimme aktiivisesti tapahtumia ja pelaajia kasvattaaksemme frisbee golf -lajia maailmanlaajuisesti.',
    
    // CTA Section
    'cta.title': 'Valmiina varastoimaan Lucky Discs?',
    'cta.subtitle': 'Liity jälleenmyyjäverkostoomme ja tarjoa asiakkaillesi premium frisbee golf -välineitä ainutlaatuisella tyylillä.',
    'cta.applyForWholesale': 'Hae tukkukaupan pääsyä',
    
    // Footer
    'footer.description': 'Premium frisbee golf -välineet villillä tyylillä ja poikkeuksellisella suorituskyvyllä. Lucky Discs - tuo onnea peliisi.',
    'footer.quickLinks': 'Pikalinkit',
    'footer.discGuide': 'Kiekko-opas',
    'footer.contactInfo': 'Yhteystiedot',
    'footer.email': 'Sähköposti:',
    'footer.location': 'Sijainti:',
    'footer.businessType': 'Liiketoiminnan tyyppi:',
    'footer.specialty': 'Erikoisalue:',
    'footer.businessTypeValue': 'Premium frisbee golf -välineet',
    'footer.specialtyValue': 'Modernit kiekot • Villi tyyli • Onnekkaita heittoja',
    'footer.newsletter': 'Uutiskirje',
    'footer.newsletterDescription': 'Tilaa saadaksesi erikoistarjouksia, ilmaisia arvontoja ja tuotelanseerauksia.',
    'footer.thanksForSubscribing': 'Kiitos tilauksesta! 🍀',
    'footer.checkEmailConfirmation': 'Tarkista sähköpostisi vahvistuksen saamiseksi',
    'footer.yourEmail': 'Sähköpostiosoitteesi',
    'footer.allRightsReserved': 'Kaikki oikeudet pidätetään.',
    'footer.privacyPolicy': 'Tietosuojakäytäntö',
    'footer.termsOfService': 'Käyttöehdot',
    
    // 404 Page
    'notFound.title': 'Sivu ei löytynyt',
    'notFound.description': 'Etsimääsi sivua ei löytynyt. Tutustu tiimimme kapteeniin tai katso tuotteemme.',
    'notFound.readAboutDaniel': 'Lue Danielista',
    'notFound.exploreProducts': 'Tutustu tuotteisiin',
  }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('lucky-discs-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lucky-discs-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};