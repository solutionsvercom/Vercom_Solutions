import { useState } from 'react';
import { Portfolio } from '../components/Portfolio';
import { PortfolioAccessForm } from '../components/PortfolioAccessForm';

export function PortfolioPage() {
  const [accessUnlocked, setAccessUnlocked] = useState(false);

  const handleUnlock = () => setAccessUnlocked(true);

  return (
    <div className="pt-12">
      <Portfolio accessUnlocked={accessUnlocked}>
        {!accessUnlocked && <PortfolioAccessForm onSuccess={handleUnlock} />}
      </Portfolio>
    </div>
  );
}
