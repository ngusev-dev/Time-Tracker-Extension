import { useState } from 'react';
import { CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatTime } from '../../lib/helper/time.helper';
import { Pause, Play, Square } from 'lucide-react';
import { TimerStore } from '../../store/Timer.store';
import { observer } from 'mobx-react-lite';

const projects = [
  'Разработка веб-сайта',
  'Мобильное приложение',
  'Аналитическая система',
  'Техническая поддержка',
  'Планирование проекта',
];

export const TimeTracker = observer(() => {
  const { seconds, endTimer, pauseTimer, isStarted, isPaused, startTimer, updateDescription, description } = TimerStore;
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <div className="w-full">
      <CardContent className="flex flex-col gap-4">
        <div className="text-center">
          <div className="text-6xl font-mono">{formatTime(seconds)}</div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Выбери категорию:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full p-2 border rounded-md bg-background text-sm"
          >
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={description ?? ''}
          onChange={(e) => updateDescription(e.target.value)}
          className="border rounded-md bg-background p-2 text-sm resize-none"
          placeholder="Описание..."
          rows={4}
        />
        <div className="w-full flex gap-2 justify-center">
          {(!isStarted || isPaused) && (
            <Button onClick={async () => await startTimer()} variant={isPaused ? 'outline' : 'default'}>
              <Play className="w-4 h-4" /> {isPaused ? 'Продолжить' : 'Начать'}
            </Button>
          )}

          {isStarted && (
            <div className="flex gap-2 w-full justify-center">
              <Button variant="secondary" onClick={async () => await pauseTimer()}>
                <Pause className="w-4 h-4" />
                Пауза
              </Button>
              <Button variant="destructive" onClick={async () => await endTimer()}>
                <Square className="w-4 h-4" />
                Стоп
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
});
