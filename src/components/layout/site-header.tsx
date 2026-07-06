"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { navItems, siteConfig } from "@/lib/site-config";
import { accentText } from "@/lib/accents";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link href="/" className="text-[15px] font-bold text-head-soft">
      <span className="text-brand-green">&gt;_</span>saket
      <span className="text-brand-amber">.dev</span>
    </Link>
  );
}

const SCROLL_RESUME_KEYS = [
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
];

export function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  // While true, the scroll spy is paused: a clicked nav item stays highlighted
  // until the user scrolls again, so scroll math can never "correct" a click.
  const spyPausedRef = useRef(false);
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);

  // Active-section highlight while scrolling the home page. Recomputed from
  // every section's position on each scroll frame rather than an
  // IntersectionObserver: an anchor-link jump moves multiple sections across
  // an observer's detection zone in the same callback batch, and whichever
  // entry happens to fire last (not necessarily the one clicked) would win.
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    let ticking = false;
    const updateActive = () => {
      ticking = false;
      if (spyPausedRef.current) return;
      const offset = (headerRef.current?.getBoundingClientRect().height ?? 72) + 24;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      // A section activates when its top crosses the header line…
      const thresholds = sections.map(
        (el) => el.getBoundingClientRect().top + window.scrollY - offset
      );
      // …but sections near the end of a short page may sit past the last
      // reachable scroll position and would never activate. Cap those
      // thresholds inside the final scrollable stretch, spaced in document
      // order, so every section still gets a highlight window while scrolling.
      if (maxScroll > 0) {
        for (let i = thresholds.length - 1; i >= 0; i--) {
          const cap = maxScroll - 2 - (thresholds.length - 1 - i) * 90;
          if (thresholds[i] > cap) thresholds[i] = cap;
        }
      }
      let current = sections[0].id;
      sections.forEach((section, i) => {
        if (window.scrollY >= thresholds[i]) current = section.id;
      });
      setActiveSection(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateActive);
    };
    // Any genuine scroll gesture hands control back to the spy.
    const resumeSpy = () => {
      if (!spyPausedRef.current) return;
      spyPausedRef.current = false;
      onScroll();
    };
    const resumeSpyOnKey = (event: KeyboardEvent) => {
      if (SCROLL_RESUME_KEYS.includes(event.key)) resumeSpy();
    };

    // Landing with a hash (e.g. arriving from /blog via a nav link): pin that
    // section instead of trusting the post-jump scroll position, which for
    // late sections may be clamped to the bottom of the page.
    const hash = window.location.hash.slice(1);
    if (hash && navItems.some((item) => item.id === hash)) {
      spyPausedRef.current = true;
      requestAnimationFrame(() => setActiveSection(hash));
    } else {
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", resumeSpy, { passive: true });
    window.addEventListener("touchstart", resumeSpy, { passive: true });
    window.addEventListener("mousedown", resumeSpy);
    window.addEventListener("keydown", resumeSpyOnKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", resumeSpy);
      window.removeEventListener("touchstart", resumeSpy);
      window.removeEventListener("mousedown", resumeSpy);
      window.removeEventListener("keydown", resumeSpyOnKey);
    };
  }, [pathname]);

  // Pin the clicked nav item; the spy stays paused until the next scroll
  // gesture (see resumeSpy above).
  const pinSection = (item: (typeof navItems)[number]) => {
    if (pathname !== "/" || !item.href.startsWith("/#")) return;
    spyPausedRef.current = true;
    setActiveSection(item.id);
  };

  const active = pathname.startsWith("/blog") ? "blog" : activeSection;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-dashed border-[rgba(74,222,128,0.2)] bg-[rgba(10,15,12,0.7)] backdrop-blur-[6px]"
    >
      <div className="mx-auto flex max-w-[1140px] items-center justify-between px-5 py-5 sm:px-10">
        <Logo />

        <nav className="hidden items-center gap-[22px] text-[12.5px] md:flex">
          {navItems.map((item) => {
            const isActive = pathname === "/" || pathname.startsWith("/blog")
              ? active === item.id
              : false;
            return (
              <Link
                key={item.id}
                href={item.href}
                data-active={isActive}
                onClick={() => pinSection(item)}
                className={cn(
                  "nav-link transition-colors",
                  isActive
                    ? "text-brand-green"
                    : item.accent
                      ? accentText[item.accent]
                      : "text-[#7d8f83]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-brand-green px-4 py-[9px] text-xs font-bold text-bg shadow-[3px_3px_0_#fbbf24] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#fbbf24] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#fbbf24] sm:inline-block"
          >
            ./download_cv
          </a>

          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="border-l border-dashed bg-panel">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-brand-green">&gt;_</span>saket
                    <span className="text-brand-amber">.dev</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 text-[13px]">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setOpen(false);
                        pinSection(item);
                      }}
                      className={cn(
                        "rounded-md px-2 py-2 transition-colors hover:bg-panel-alt",
                        item.accent ? accentText[item.accent] : "text-[#7d8f83]"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 rounded-lg bg-brand-green px-4 py-[9px] text-center text-xs font-bold text-bg shadow-[3px_3px_0_#fbbf24]"
                  >
                    ./download_cv
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
