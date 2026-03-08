const BUTTONDOWN_ACTION =
  "https://buttondown.com/api/emails/embed-subscribe/shodh_memory";

export function Newsletter({
  variant,
}: {
  variant: "inline" | "card";
}) {
  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-[var(--term-text-dim)] text-sm">
          Get updates on releases and AI memory research.
        </p>
        <form
          action={BUTTONDOWN_ACTION}
          method="post"
          className="embeddable-buttondown-form flex items-center gap-2"
          referrerPolicy="unsafe-url"
        >
          <label htmlFor="bd-email-inline" className="sr-only">
            Email
          </label>
          <input
            id="bd-email-inline"
            type="email"
            name="email"
            required
            placeholder="agent@example.com"
            className="flex-1 min-w-0 bg-[var(--term-bg)] border border-[var(--term-border)] text-[var(--term-text)] placeholder:text-[var(--term-text-dim)] text-sm px-3 py-1.5 rounded-none font-mono focus:outline-none focus:border-[var(--term-orange)]"
          />
          <input
            type="submit"
            value="Subscribe"
            className="shadow-btn shadow-btn-primary px-4 py-1.5 text-sm whitespace-nowrap cursor-pointer"
          />
        </form>
      </div>
    );
  }

  return (
    <div className="border border-[var(--term-border)] bg-[var(--term-bg)] p-6">
      <div className="mb-4">
        <h3 className="text-[var(--term-text)] font-mono text-base mb-1">
          <span className="text-[var(--term-green)]">$</span> subscribe
        </h3>
        <p className="text-[var(--term-text-dim)] text-sm">
          Get updates on releases, features, and AI memory research.
        </p>
      </div>

      <form
        action={BUTTONDOWN_ACTION}
        method="post"
        className="embeddable-buttondown-form flex flex-col gap-3"
        referrerPolicy="unsafe-url"
      >
        <label htmlFor="bd-email-card" className="sr-only">
          Email
        </label>
        <input
          id="bd-email-card"
          type="email"
          name="email"
          required
          placeholder="agent@example.com"
          className="w-full bg-[var(--term-bg)] border border-[var(--term-border)] text-[var(--term-text)] placeholder:text-[var(--term-text-dim)] text-sm px-3 py-2 rounded-none font-mono focus:outline-none focus:border-[var(--term-orange)]"
        />
        <input
          type="submit"
          value="Subscribe"
          className="shadow-btn shadow-btn-primary px-4 py-2 text-sm w-full cursor-pointer"
        />
      </form>
    </div>
  );
}
