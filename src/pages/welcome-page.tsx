import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, NotebookText, SmilePlus, FileDown } from "lucide-react";

export default function WelcomePage() {
  return (
    <motion.section
      className="relative min-h-screen px-6 py-12 flex flex-col items-center text-foreground bg-gradient-to-r from-teal-100 via-pink-100 to-lime-200 overflow-hidden dark:bg-gradient-to-b dark:from-background dark:via-muted dark:to-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-5xl w-full text-center z-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-brand-primary">Wellnest</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Your cozy space to track wellness — one breath, one entry at a time.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Button
            className="hover:scale-105 hover:shadow-lg transition"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            variant="outline"
            className="hover:scale-105 transition"
            asChild
          >
            <Link to="/register">Register</Link>
          </Button>
          <Button
            className="hover:scale-105 hover:shadow-lg transition bg-brand-primary hover:bg-brand-primary/90"
            asChild
          >
            <Link to="demo/dashboard">Try Demo</Link>
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-20 w-full max-w-5xl z-10">
        <FadeIn delay={0.1}>
          <Feature
            icon={NotebookText}
            title="Rich Journaling"
            description="Write freely with a clean, focused editor designed for self-reflection and creativity."
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <Feature
            icon={SmilePlus}
            title="Mood Tracking"
            description="Log your mood and visualize how you’re feeling over time with beautiful charts."
          />
        </FadeIn>
        <FadeIn delay={0.3}>
          <Feature
            icon={FileDown}
            title="Export as PDF"
            description="Download your journal entries and keep a record of your progress and reflections."
          />
        </FadeIn>
      </div>
      <div className="w-full max-w-5xl grid sm:grid-cols-2 gap-6 z-10"></div>

      <div className="text-center mt-16 sm:mt-20 max-w-3xl z-10">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
          <Sparkles className="text-brand-primary w-6 h-6" />
          Why choose Wellnest?
        </h2>
        <p className="text-muted-foreground text-lg">
          Because journaling should feel empowering — not overwhelming. With
          Wellnest, you reflect, track your emotions, and stay in tune with your
          mental wellbeing.
        </p>
      </div>

      <footer className="w-full max-w-3xl mt-20 px-4 text-muted-foreground text-sm text-center space-y-6 z-10">
  <div>
    <h2 className="text-lg font-semibold mb-2 text-foreground">Attributions 💚</h2>
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-foreground mb-1">Icons</h3>
        <ul className="space-y-1">
          <li>
            <a
              href="https://www.flaticon.com/free-icons/lotus"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lotus icons created by Freepik - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/mood"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mood icons created by Naiting - Flaticon
            </a>
          </li>
          <li>
            <a
              href="https://www.flaticon.com/free-icons/meditation"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meditation icons created by HAJICON - Flaticon
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-foreground mb-1">Images</h3>
        <ul className="space-y-1">
          <li>
            <a
              href="https://unsplash.com/photos/green-forest-trees-R4bsmYIc6FI"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trees background
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/gray-rocks-on-seashore-during-daytime-KBn4-lyqRgQ"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sea background
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/green-plant-HNx4QLRgy2k"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rain background
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/blue-sky-with-clouds-viNPa2F7fnw"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sky background
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/lake-between-trees-and-mountains-HtUBBdNDxpQ"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              River background
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/body-of-water-surrounded-by-trees-NRQV-hBF10M"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nature background
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/a-bench-sits-by-the-water-H8OZNQIr2Hc"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bench by the sea
            </a>
          </li>
          <li>
            <a
              href="https://unsplash.com/photos/woman-sitting-on-bench-cjrULwnJKhI"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Park
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </motion.section>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="shadow-md hover:shadow-xl transition hover:scale-[1.02]">
      <CardContent className="p-6 text-center">
        <Icon className="w-8 h-8 text-brand-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
