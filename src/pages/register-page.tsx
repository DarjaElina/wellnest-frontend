import { motion } from "framer-motion"
import RegisterForm from "@/components/shared/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row m-auto justify-center bg-background">
      <motion.div
        className="relative hidden lg:flex lg:w-[40%] items-center justify-center overflow-hidden p-8"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1487139975590-b4f1dce9b035?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Wellness"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
        />

        <div className="relative z-10 max-w-md text-center bg-muted/60 dark:bg-background/70 backdrop-blur-sm rounded-xl p-6 shadow-xl text-foreground">
          <blockquote className="text-lg italic mb-4 text-muted-foreground dark:text-foreground">
            “I started journaling with Wellnest every morning. It’s like a breath of fresh air — calming, grounding, and so simple.”
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="Testimonial"
              className="w-10 h-10 rounded-full shadow-md"
            />
            <div className="text-left">
              <p className="text-sm font-medium">Anna S.</p>
              <p className="text-xs text-muted-foreground">Wellnest User</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <RegisterForm />
      </motion.div>
    </div>
  )
}
