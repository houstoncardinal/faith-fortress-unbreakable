import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found - 404 | Deen Islamic App"
        description="The page you're looking for doesn't exist. Return to Deen app to access prayer times, Quran, dhikr counter, and more Islamic features."
        keywords="404 error, page not found, Deen app, Islamic app"
        canonical={`https://deen-app.com${location.pathname}`}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Islamic Greeting */}
          <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 leading-relaxed">
            لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا
          </div>
          <p className="text-sm text-muted-foreground mb-6 italic">
            "Do not grieve; indeed Allah is with us" - Quran 9:40
          </p>
          
          {/* 404 Error */}
          <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for seems to have taken a different path. 
            Let's guide you back to your spiritual journey.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
          
          {/* Helpful Links */}
          <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-sm text-muted-foreground mb-3">Explore our features:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/duas">
                <Button variant="ghost" size="sm">Duas</Button>
              </Link>
              <Link to="/#prayer-times">
                <Button variant="ghost" size="sm">Prayer Times</Button>
              </Link>
              <Link to="/#qibla-section">
                <Button variant="ghost" size="sm">Qibla</Button>
              </Link>
              <Link to="/#dhikr-section">
                <Button variant="ghost" size="sm">Dhikr</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
