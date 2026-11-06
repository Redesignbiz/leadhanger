"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { isGroup, type NavItem, type NavLink } from "@/lib/navigation";

/**
 * A "/#section" anchor stays a plain `a`; a route gets `Link`, for the prefetch.
 * The reason is in Header.tsx.
 */
function NavAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return href.includes("#") ? (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const linkClass =
  "text-ink-muted hover:text-ink text-[16px] font-medium transition-colors";

/**
 * The header's menus: the desktop row with its drop-downs, and below `lg` a
 * Menu button that opens the same entries as a panel. Disclosure buttons, not
 * hover menus: they work the same for a mouse, a keyboard and a finger.
 *
 * A menu closes on Escape, on a click outside it, on a link inside it, and on
 * a route change. The last needs no effect: the open menu remembers the path it
 * was opened on, and counts as closed on any other.
 */
export function HeaderNav({
  items,
  cta,
}: {
  items: readonly NavItem[];
  cta: NavLink;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<{ key: string; path: string } | null>(null);
  const current = open && open.path === pathname ? open.key : null;
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!current) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    function onPointer(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [current]);

  const toggle = (key: string) =>
    setOpen(current === key ? null : { key, path: pathname });
  const close = () => setOpen(null);
  const mobileOpen = current === "mobile";

  return (
    <div ref={rootRef} className="flex items-center gap-6 lg:flex-1 lg:justify-between">
      <nav aria-label="Main" className="hidden items-center gap-8 lg:ml-10 lg:flex">
        {items.map((item) =>
          isGroup(item) ? (
            <div key={item.label} className="relative">
              <button
                type="button"
                aria-expanded={current === item.label}
                aria-controls={`${id}-${item.label}`}
                onClick={() => toggle(item.label)}
                className={`${linkClass} flex items-center gap-1.5`}
              >
                {item.label}
                <Chevron open={current === item.label} />
              </button>
              <div
                id={`${id}-${item.label}`}
                hidden={current !== item.label}
                className="border-line-strong bg-panel absolute top-full left-0 mt-3 w-72 rounded-lg border p-2"
              >
                <ul>
                  {item.items.map((link) => (
                    <li key={link.href}>
                      <NavAnchor
                        href={link.href}
                        onClick={close}
                        className="hover:bg-panel-high block rounded-md px-3 py-2.5 transition-colors"
                      >
                        <span className="text-ink block text-[15px] font-medium">
                          {link.label}
                        </span>
                        {link.note && (
                          <span className="text-ink-dim mt-0.5 block text-[13px] leading-snug">
                            {link.note}
                          </span>
                        )}
                      </NavAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <NavAnchor key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </NavAnchor>
          ),
        )}
      </nav>

      {/*
        On a phone the logo, the main button and the menu button share about
        335px, and the brief's "Get a free audit" leaves no room for the word
        "Menu" as well; below `sm` the menu button is an icon with the same
        name for screen readers.
      */}
      <div className="flex items-center gap-2 sm:gap-3">
        <NavAnchor
          href={cta.href}
          onClick={close}
          className="bg-blue hover:bg-blue-hover shrink-0 rounded-full px-3.5 py-2 text-[13.5px] font-semibold text-white transition-colors sm:px-5 sm:text-[14.5px]"
        >
          {cta.label}
        </NavAnchor>
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls={`${id}-mobile`}
          aria-label={mobileOpen ? "Close menu" : "Menu"}
          onClick={() => toggle("mobile")}
          className="border-line-strong text-ink hover:bg-panel-high flex size-9 shrink-0 items-center justify-center rounded-full border text-[14px] font-semibold transition-colors sm:size-auto sm:px-3.5 sm:py-2 lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 sm:hidden"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
          <span className="hidden sm:inline">{mobileOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      <div
        id={`${id}-mobile`}
        hidden={!mobileOpen}
        className="border-line bg-ground absolute inset-x-0 top-full border-b lg:hidden"
      >
        <nav
          aria-label="Main"
          className="max-h-[calc(100svh-5rem)] overflow-y-auto px-5 py-6 sm:px-8"
        >
          <ul className="space-y-6">
            {items.map((item) =>
              isGroup(item) ? (
                <li key={item.label}>
                  <p className="eyebrow text-ink-dim">{item.label}</p>
                  <ul className="mt-3 space-y-3">
                    {item.items.map((link) => (
                      <li key={link.href}>
                        <NavAnchor
                          href={link.href}
                          onClick={close}
                          className="text-ink text-[16px] font-medium"
                        >
                          {link.label}
                        </NavAnchor>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <NavAnchor
                    href={item.href}
                    onClick={close}
                    className="text-ink text-[16px] font-medium"
                  >
                    {item.label}
                  </NavAnchor>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
