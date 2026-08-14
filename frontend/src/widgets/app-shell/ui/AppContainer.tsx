import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AppFooter } from '../../app-footer/ui/AppFooter';

export function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="app-canvas">
      <div className="app-window">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <Header />
          <div className="app-shell-main">{children}</div>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}
