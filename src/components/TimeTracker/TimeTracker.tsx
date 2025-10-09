import { useState } from 'react';
import { CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const projects = [
  'Разработка веб-сайта',
  'Мобильное приложение',
  'Аналитическая система',
  'Техническая поддержка',
  'Планирование проекта',
];

const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export function TimeTracker() {
  const [time] = useState(0);
  const [selectedProject, setSelectedProject] = useState('');

  return (
    <div className="w-full">
      <CardContent className="flex flex-col gap-4">
        <div className="text-center">
          <div className="text-4xl font-mono">{formatTime(time)}</div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Выбери категорию:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">Категория</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 justify-center">
          <Button>Начать</Button>
        </div>
      </CardContent>
    </div>
  );
}
