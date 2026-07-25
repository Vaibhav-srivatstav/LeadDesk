"use client";

export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const styles = {
    blue: {
      icon: "bg-blue-500/10 text-blue-500",
      glow: "from-blue-500/10",
      border: "hover:border-blue-300 dark:hover:border-blue-500/30",
    },

    purple: {
      icon: "bg-purple-500/10 text-purple-500",
      glow: "from-purple-500/10",
      border: "hover:border-purple-300 dark:hover:border-purple-500/30",
    },

    orange: {
      icon: "bg-orange-500/10 text-orange-500",
      glow: "from-orange-500/10",
      border: "hover:border-orange-300 dark:hover:border-orange-500/30",
    },

    emerald: {
      icon: "bg-emerald-500/10 text-emerald-500",
      glow: "from-emerald-500/10",
      border: "hover:border-emerald-300 dark:hover:border-emerald-500/30",
    },
  };

  const current = styles[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-5 shadow-xl shadow-slate-300/20 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20 ${current.border}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${current.glow} to-transparent blur-2xl`}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${current.icon}`}
          >
            {icon}
          </div>
        </div>

        <p className="mt-5 text-3xl font-bold">
          {value}
        </p>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200/60 dark:bg-white/10">
          <div
            className={`h-full w-2/3 rounded-full bg-gradient-to-r ${
              color === "blue"
                ? "from-blue-500 to-cyan-400"
                : color === "purple"
                  ? "from-purple-500 to-violet-400"
                  : color === "orange"
                    ? "from-orange-500 to-amber-400"
                    : "from-emerald-500 to-teal-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
}