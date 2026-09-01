import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/app-shell/ui/Header';
import { Sidebar } from '@/widgets/app-shell/ui/Sidebar';
import { AppFooter } from '@/widgets/app-shell/ui/AppFooter';

export function AppContainer() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="flex min-h-screen w-full bg-white">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <Header />

          <main className="flex-1">
            <Outlet />
          </main>

          <AppFooter />
        </div>
      </div>
    </div>
  );
}
