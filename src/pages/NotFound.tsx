import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import useSEO from "@/hooks/useSEO";
import luckyLogo from "@/assets/lucky-discs-transparent-logo.png";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useSEO({
    title: "404 - Page Not Found | Lucky Discs",
    description: "The page you're looking for doesn't exist. Explore Lucky Discs premium disc golf equipment.",
    canonicalPath: "/404",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-20">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">{t('notFound.title')}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                {t('notFound.description')}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button asChild>
                  <Link to="/team">{t('notFound.exploreTeam')}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/discs">{t('notFound.exploreProducts')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src={luckyLogo} alt="Lucky Discs" className="rounded-xl shadow-xl w-full h-auto object-contain max-w-md mx-auto" width={400} height={400} />
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-primary/40 to-accent/30 rounded-full" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;