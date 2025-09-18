import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import danielImage from "@/assets/daniel-davidsson.png";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.warn(
      "404: Page not found",
      location.pathname
    );
  }, [location.pathname]);

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
                  <Link to="/team">{t('notFound.readAboutDaniel')}</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link to="/discs">{t('notFound.exploreProducts')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src={danielImage} alt="Daniel Davidsson" className="rounded-xl shadow-xl w-full h-auto object-cover" />
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
