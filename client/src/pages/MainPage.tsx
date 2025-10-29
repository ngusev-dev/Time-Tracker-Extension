import { Suspense } from 'react';
import { TimeTracker } from '../components/TimeTracker/TimeTracker';

function MainPage() {
  return (
    <div className="flex items-center  h-full">
      <Suspense fallback={<p>Loading...</p>}>
        <TimeTracker />
      </Suspense>
    </div>
  );
}

export default MainPage;
