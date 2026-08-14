import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from '../pages/auth/ui/AuthPage';
import { EventCatalogPage } from '../pages/event-catalog/ui/EventCatalogPage';
import { EventDetailsPage } from '../pages/event-details/ui/EventDetailsPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<EventCatalogPage />} />
      <Route path="/events/:eventId" element={<EventDetailsPage />} />
      <Route path="/sign-in" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
