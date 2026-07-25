"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  Inbox,
  Menu,
  RefreshCw,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import StatCard from "./StatCard";
import SearchBar from "./SearchBar";
import LeadTable from "./LeadTable";
import ThemeToggle from "./ThemeToggle";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  async function fetchLeads(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch("/api/leads");

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();

      setLeads(Array.isArray(data) ? data : data.leads || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function updateStatus(id, status) {
    try {
      const response = await fetch(`/api/leads/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                status,
              }
            : lead
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  }

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return leads;
    }

    return leads.filter((lead) => {
      return (
        lead.name?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.message?.toLowerCase().includes(query) ||
        lead.budgetRange?.toLowerCase().includes(query) ||
        lead.status?.toLowerCase().includes(query)
      );
    });
  }, [leads, search]);

  const stats = {
    total: leads.length,
    new: leads.filter((lead) => lead.status === "NEW").length,
    contacted: leads.filter((lead) => lead.status === "CONTACTED").length,
    closed: leads.filter((lead) => lead.status === "CLOSED").length,
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors dark:bg-[#070b18] dark:text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-[#070b18] dark:via-[#11102a] dark:to-[#180b1d]" />

        <div className="absolute left-[-180px] top-[100px] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[130px] dark:bg-blue-600/20" />

        <div className="absolute right-[-150px] top-[250px] h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[140px] dark:bg-purple-600/20" />

        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-pink-400/15 blur-[150px] dark:bg-pink-600/10" />

        <div
          className="absolute inset-0 opacity-[0.2] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,116,139,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/40 shadow-lg shadow-slate-300/10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#070b18]/40">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 font-bold text-white shadow-lg shadow-purple-500/25">
              L

              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            </div>

            <div>
              <p className="font-bold tracking-tight">
                LeadDesk
              </p>

              <p className="hidden text-[11px] text-slate-500 dark:text-slate-400 sm:block">
                Lead management
              </p>
            </div>
          </Link>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium text-slate-600 backdrop-blur-xl transition hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/10"
            >
              <ArrowLeft size={16} />
              View website
            </Link>

            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]"
            >
              {mobileMenu ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="border-t border-white/20 bg-white/50 p-5 backdrop-blur-2xl dark:border-white/10 dark:bg-[#070b18]/70 md:hidden">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/40 px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/[0.05]"
            >
              <ArrowLeft size={16} />
              View website
            </Link>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:py-10">
        {/* Page Header */}
        <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/40 px-3 py-1.5 text-xs font-semibold text-purple-700 backdrop-blur-xl dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300">
              <Sparkles size={14} />
              Lead management workspace
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to your dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Track, manage, and convert your incoming leads.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchLeads(true)}
            disabled={refreshing}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/40 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-300/10 backdrop-blur-xl transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/10"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Leads"
            value={stats.total}
            icon={<Users size={21} />}
            color="blue"
          />

          <StatCard
            title="New Leads"
            value={stats.new}
            icon={<Inbox size={21} />}
            color="purple"
          />

          <StatCard
            title="Contacted"
            value={stats.contacted}
            icon={<Clock3 size={21} />}
            color="orange"
          />

          <StatCard
            title="Closed"
            value={stats.closed}
            icon={<CheckCircle2 size={21} />}
            color="emerald"
          />
        </section>

        {/* Main Dashboard */}
        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
          {/* Leads Table */}
          <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-2xl shadow-slate-300/20 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20">
            {/* Shine */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />

            {/* Header */}
            <div className="border-b border-white/30 p-5 dark:border-white/10 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-bold">
                    All Leads
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage and track your customer inquiries.
                  </p>
                </div>

                <div className="w-full sm:max-w-xs">
                  <SearchBar
                    value={search}
                    onChange={setSearch}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="p-3 sm:p-5">
              {loading ? (
                <LoadingState />
              ) : filteredLeads.length === 0 ? (
                <EmptyState search={search} />
              ) : (
                <LeadTable
                  leads={filteredLeads}
                  onStatusChange={updateStatus}
                />
              )}
            </div>
          </div>

          {/* Side Panel */}
          <aside className="space-y-6">
            {/* Pipeline */}
            <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-6 shadow-xl shadow-slate-300/20 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/20">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20" />

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20">
                  <BarChart3 size={19} />
                </div>

                <div>
                  <h3 className="font-bold">
                    Lead Pipeline
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Current distribution
                  </p>
                </div>
              </div>

              <PipelineRow
                label="New"
                value={stats.new}
                total={stats.total}
                color="bg-purple-500"
              />

              <PipelineRow
                label="Contacted"
                value={stats.contacted}
                total={stats.total}
                color="bg-orange-500"
              />

              <PipelineRow
                label="Closed"
                value={stats.closed}
                total={stats.total}
                color="bg-emerald-500"
              />
            </div>

            {/* Quick Tip */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-300/30 bg-gradient-to-br from-blue-500/80 via-purple-500/80 to-pink-500/80 p-6 text-white shadow-xl shadow-purple-500/20 backdrop-blur-2xl">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/30 blur-2xl" />

              <div className="relative">
                <Sparkles
                  size={22}
                  className="mb-4"
                />

                <h3 className="font-bold">
                  Quick tip
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Follow up with new leads quickly to increase your chances of converting them into customers.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function PipelineRow({
  label,
  value,
  total,
  color,
}) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {label}
        </span>

        <span className="font-bold">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-1 text-right text-xs text-slate-400">
        {percentage}%
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <RefreshCw
        size={28}
        className="animate-spin text-purple-500"
      />

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        Loading leads...
      </p>
    </div>
  );
}

function EmptyState({ search }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 text-purple-500">
        <Search size={26} />
      </div>

      <h3 className="mt-4 font-semibold">
        {search ? "No leads found" : "No leads yet"}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {search
          ? "Try searching with a different name, email, or status."
          : "New lead submissions will appear here."}
      </p>
    </div>
  );
}