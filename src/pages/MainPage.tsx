import { NavLink } from 'react-router';
import { ROUTES } from '../lib/router.config';
import { useEffect, useState } from 'react';

function MainPage() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    chrome.storage.local.get(['timer']).then(({ timer }) => {
      console.log(timer);
      if (timer !== null) setTimer(timer);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setTimer((prev) => {
          chrome.storage.local.set({ timer: prev + 1 }).then(() => {
            console.log('Value is set');
          });
          return prev + 1;
        }),
      1000
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <NavLink to={ROUTES.goTo(ROUTES.STATISTIC)}>Статистика </NavLink>
      {timer}
    </div>
  );
}

export default MainPage;
