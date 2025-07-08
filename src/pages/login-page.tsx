import { motion } from "framer-motion"
import LoginForm from "@/components/shared/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row m-auto justify-center bg-background">
      <motion.div
        className="relative hidden lg:flex lg:w-[40%] items-center justify-center overflow-hidden p-8"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1679641049908-1c1bc90d2609?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="Wellness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 max-w-md text-center bg-muted/60 dark:bg-background/70 backdrop-blur-sm rounded-xl p-6 shadow-xl text-foreground">
          <h2 className="text-xl font-semibold mb-2">Welcome back ❤️</h2>
          <p className="text-muted-foreground dark:text-foreground text-sm italic">
            Wellnest is built to help you reflect, not just track. Your space is always here.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <LoginForm />
      </motion.div>
    </div>
  )
}


