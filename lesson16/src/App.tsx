import { useState } from 'react';
import './App.css';
import { Layout } from '@/components/Layout';
import type { AppPage } from '@/navigation';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';

function App() {
  const [page, setPage] = useState<AppPage>('home');

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {page === 'home' ? <HomePage /> : <AboutPage />}
    </Layout>
  );
}

export default App;
