import Image from "next/image";
import Link from "next/link";

import { hero, siteConfig } from "@/lib/site-config";
import { TerminalWindow } from "@/components/terminal-window";

export function HeroSection() {
  return (
    <section id="home" className="relative">
      <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-11 px-5 pt-[60px] pb-[68px] sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          aria-hidden
          className="animate-floaty absolute top-[30px] right-[44%] hidden text-[26px] text-brand-amber lg:block"
        >
          ✦
        </div>

        <div className="animate-fade-up">
          <div className="mb-7">
            <TerminalWindow />
          </div>
          <h1 className="font-display mb-[18px] text-[40px] leading-[1.02] font-bold tracking-[-0.02em] text-head md:text-[60px]">
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
            <br />
            <span className="text-brand-green [text-shadow:0_0_28px_rgba(74,222,128,0.5)]">
              {hero.titleHighlight}
            </span>{" "}
            <span className="text-brand-amber">⚡</span>
          </h1>
          <p className="mb-[26px] max-w-[450px] text-sm leading-[1.7] text-ink-dim">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={hero.primaryCta.href}
              className="rounded-[9px] bg-brand-green px-[22px] py-[13px] text-[13px] font-bold text-bg shadow-[4px_4px_0_#38bdf8] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#38bdf8] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#38bdf8]"
            >
              {hero.primaryCta.label} →
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-[9px] border border-dashed border-[rgba(74,222,128,0.4)] px-[22px] py-[13px] text-[13px] font-medium text-ink transition-colors duration-150 hover:border-brand-green hover:text-head-soft"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="animate-fade-up relative mx-auto w-full max-w-[360px] [animation-delay:0.15s] lg:mx-0 lg:max-w-none">
          <div className="-rotate-2 rounded-2xl border border-[rgba(74,222,128,0.25)] bg-panel p-2.5">
            <Image
              src={hero.photo}
              alt={`Portrait of ${siteConfig.name}`}
              width={880}
              height={1100}
              priority
              className="aspect-[4/5] w-full rounded-[11px] object-cover"
            />
          </div>
          <div className="animate-floaty absolute -top-4 -right-2.5 rotate-6 rounded-[10px] bg-brand-amber px-3 py-[7px] text-[11px] font-bold text-bg shadow-[0_6px_18px_rgba(251,191,36,0.3)]">
            {hero.badges[0].label}
          </div>
          <div className="animate-floaty absolute -bottom-3.5 -left-4 -rotate-[5deg] rounded-[10px] bg-brand-pink px-3 py-[7px] text-[11px] font-bold text-bg shadow-[0_6px_18px_rgba(244,114,182,0.3)] [animation-delay:0.4s] [animation-duration:4.5s]">
            {hero.badges[1].label}
          </div>
        </div>
      </div>
    </section>
  );
}
