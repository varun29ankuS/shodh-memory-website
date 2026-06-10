import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      {children}
      <BackToTop />
    </>
  );
}
