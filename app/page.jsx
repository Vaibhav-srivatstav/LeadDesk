"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  Menu,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";

import LeadForm from "@/components/LeadForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-[#070b18] dark:text-white">
      {/* Colorful Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Blue Glow */}
        <div className="absolute left-[-180px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[130px] dark:bg-blue-600/20" />

        {/* Purple Glow */}
        <div className="absolute right-[-150px] top-[250px] h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[140px] dark:bg-purple-600/20" />

        {/* Cyan Glow */}
        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px] dark:bg-cyan-500/10" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#070b18]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 font-bold text-white shadow-lg shadow-purple-500/25">
              L

              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            </div>

            <span className="text-lg font-bold tracking-tight">
              LeadDesk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-slate-500 transition hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
            >
              How it works
            </a>

            <a
              href="#contact"
              className="text-sm text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />

            <Link
              href="/admin"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 dark:border-white/10 dark:text-slate-400 dark:hover:border-purple-500/30 dark:hover:bg-purple-500/10 dark:hover:text-purple-300"
            >
              Admin Dashboard
            </Link>

            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:from-blue-500 hover:to-purple-500"
            >
              Get started
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10"
            >
              {menuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 dark:border-white/[0.06] dark:bg-[#070b18] md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                How it works
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                Contact
              </a>

              <Link
                href="/admin"
                className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-medium dark:border-white/10"
              >
                Admin Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-24 pt-20 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Hero Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-sm font-medium text-purple-700 dark:border-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 dark:text-purple-300">
                <Sparkles
                  size={15}
                  className="text-purple-500"
                />

                Smarter lead management
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Turn every inquiry into your{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  next opportunity.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
                Capture leads, understand what your customers need, and manage every opportunity from one simple dashboard.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white shadow-xl shadow-purple-500/20 transition hover:scale-[1.02] hover:from-blue-500 hover:to-purple-500"
                >
                  Start a conversation

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10"
                >
                  Explore features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500"
                  />
                  Easy to use
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-blue-500"
                  />
                  Real-time updates
                </div>

                <div className="flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-purple-500"
                  />
                  Secure data
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              id="contact"
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl" />

              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-purple-200/30 sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.05] dark:shadow-purple-900/20">
                <div className="mb-6">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
                    <MessageSquare size={20} />
                  </div>

                  <p className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                    Let's talk
                  </p>

                  <h2 className="text-2xl font-bold">
                    Tell us about your project
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Share a few details and we'll get back to you soon.
                  </p>
                </div>

                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-y border-slate-200 bg-white/70 px-5 py-24 dark:border-white/[0.06] dark:bg-white/[0.015] sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
              <Zap size={22} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A better way to manage leads
            </h2>

            <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
              LeadDesk keeps your lead collection simple, organized, and easy to manage.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<MessageSquare size={22} />}
              title="Capture every inquiry"
              description="Collect important information from every potential customer through one simple form."
              color="blue"
            />

            <FeatureCard
              icon={<Target size={22} />}
              title="Track your pipeline"
              description="Know which leads are new, contacted, or successfully closed at a glance."
              color="purple"
            />

            <FeatureCard
              icon={<BarChart3 size={22} />}
              title="Stay organized"
              description="Search and manage all your leads from one clean and focused dashboard."
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From first message to closed deal.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-500 dark:text-slate-400">
                A simple workflow helps you stay focused on what matters: building relationships and converting opportunities.
              </p>
            </div>

            <div className="space-y-4">
              <Step
                number="01"
                title="A customer submits a lead"
                description="They share their contact details, budget, and project requirements."
                color="blue"
              />

              <Step
                number="02"
                title="You review the opportunity"
                description="Every submission appears in your admin dashboard."
                color="purple"
              />

              <Step
                number="03"
                title="Update the lead status"
                description="Move each lead from New to Contacted to Closed."
                color="pink"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-16 text-center text-white sm:px-12">
            <div className="absolute left-1/4 top-[-100px] h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />

            <div className="absolute bottom-[-100px] right-1/4 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl" />

            <div className="relative">
              <Sparkles
                className="mx-auto mb-5"
                size={28}
              />

              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to capture your next opportunity?
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
                Start collecting better leads with a simple, focused workflow.
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-purple-600 shadow-xl transition hover:scale-[1.03] hover:bg-white/90"
              >
                Get started

                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-5 py-8 dark:border-white/[0.06] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">
              L
            </div>

            <span>© 2026 LeadDesk</span>
          </div>

          <Link
            href="/admin"
            className="transition hover:text-purple-600 dark:hover:text-purple-400"
          >
            Admin Dashboard →
          </Link>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}) {
  const styles = {
    blue: {
      wrapper:
        "hover:border-blue-300 dark:hover:border-blue-500/30",
      icon:
        "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
    },

    purple: {
      wrapper:
        "hover:border-purple-300 dark:hover:border-purple-500/30",
      icon:
        "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400",
    },

    pink: {
      wrapper:
        "hover:border-pink-300 dark:hover:border-pink-500/30",
      icon:
        "border-pink-200 bg-pink-50 text-pink-600 dark:border-pink-500/20 dark:bg-pink-500/10 dark:text-pink-400",
    },
  };

  return (
    <div
      className={`group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/[0.08] dark:bg-white/[0.025] ${styles[color].wrapper}`}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${styles[color].icon}`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  color,
}) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-violet-500",
    pink: "from-pink-500 to-rose-500",
  };

  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.025]">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colors[color]} text-sm font-bold text-white shadow-lg`}
      >
        {number}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}