export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-500" />
      
      {/* Animated gradient orbs - GPU accelerated */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />
      
      {/* Subtle grid pattern - Dark Mode (White lines) */}
      <div 
        className="absolute inset-0 opacity-[0.015] hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />

        {/* Subtle grid pattern - Light Mode (Black lines) */}
      <div 
        className="absolute inset-0 opacity-[0.03] block dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0 0 0) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-200/50 dark:to-black/50" />
    </div>
  );
}
