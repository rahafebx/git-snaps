import { Link } from 'react-router-dom';
import { Terminal, GitBranch, Cpu, CreativeCommons, Award, MessageSquareText } from 'lucide-react';
import { PageHeader } from "../components/PageHeader";
export const About = () => {
  
  const technicalFeatures = [
    {
      title: "Dynamic Markdown Fetching",
      description: "Uses Vite's structural raw dynamic modules tokenizing `.md` templates directly on-demand instantly inside client views.",
    },
    {
      title: "Custom Selector Themes",
      description: "Integrated Tailwind v4 CSS properties processing targeted custom variant selectors across dataset parameters.",
    },
    {
      title: "Client-Side Search",
      description: "Powered by FlexSearch, a high-performance full-text search library for the browser, enabling instant search results without server round-trips.",
    },
    {
      title: "Static Site Generation",
      description: "Built with Vite and React, leveraging static site generation for fast load times and optimized performance across all devices.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <PageHeader
        icon={Terminal}
        title="About"
        highlightedText="git_snaps"
        description="An open-source documentation sandbox built for engineering workflows, git architecture, and repository mechanics."
        hasSearch={false}
      />

      {/* Main Narrative Sections */}
      <div className="space-y-12 text-zinc-700 dark:text-zinc-300">
        
        {/* Core Mission Section */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
            <GitBranch className="h-5 w-5 text-primary-500" /> The Mission
          </h2>
          <p className="leading-relaxed">
            Version control systems often trip up developers early on. This blog was engineered to deliver highly visual, front-end compiled tutorials straight out of static markdown documents, breaking down branch configurations, remote tracking, and merge conflict resolutions.
          </p>
        </section>

        {/* Technical Architecture Specs */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-6">
            <Cpu className="h-5 w-5 text-primary-500" /> Technical Architecture
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {technicalFeatures.map((feature, index) => (
              <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/40">
                <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* License Section */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
            <CreativeCommons className="h-5 w-5 text-primary-500" /> License
          </h2>
          <p className="leading-relaxed text-sm">
            This project is licensed under the same terms as the original Pro Git book:
          </p>
          <div className="mt-4">
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noreferrer" className="inline-flex flex-wrap items-center gap-2 px-4 py-2 text-xs font-medium border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all duration-150 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <img src="https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg" alt="CC BY-NC-SA 4.0" className="h-4 w-auto" />
              <span>Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</span>
            </a>
          </div>
        </section>
   
        {/* Acknowledgments Section */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-primary-500" /> Acknowledgments
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li><strong>Scott Chacon</strong> and <strong>Ben Straub</strong> for the outstanding Pro Git book</li>
            <li><strong>The Git community</strong> for building and maintaining this powerful tool</li>
            <li>All contributors and learners who make this project better</li>
          </ul>
        </section>

        {/* Feedback & Questions Section */}
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
            <MessageSquareText className="h-5 w-5 text-primary-500" /> Feedback & Questions
          </h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Open an <a href="https://github.com/yourusername/your-repo/issues" className="text-primary-600 dark:text-primary-400 hover:underline">issue</a> for questions or suggestions</li>
            <li>Start a <a href="https://github.com/yourusername/your-repo/discussions" className="text-primary-600 dark:text-primary-400 hover:underline">discussion</a> for broader conversations</li>
          </ul>
        </section>

        {/* Interactive Stats Block */}
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-primary-600 dark:text-primary-400">100%</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Static Compilation</div>
            </div>
            <div>
              <div className="text-2xl font-black text-primary-600 dark:text-primary-400">&lt; 100ms</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Route Transitions</div>
            </div>
            <div>
              <div className="text-2xl font-black text-primary-600 dark:text-primary-400">Active</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Git Workflows</div>
            </div>
          </div>
        </section>
      </div>

      {/* Back Button Anchor */}
      <footer className="mt-12 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm"
        >
          Explore Git Snaps
        </Link>
      </footer>
    </div>
  );
};