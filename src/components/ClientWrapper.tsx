import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";
import { CursorGlow } from "./CursorGlow";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorGlow />
      <ScrollProgress />
      {children}
      <BackToTop />
    </>
  );
}
