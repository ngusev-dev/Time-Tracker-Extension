type Props = {
  progress: number;
};
export function Progress({ progress }: Props) {
  return (
    <div className="h-2 w-full bg-primary/15 rounded-full overflow-hidden">
      <span
        className="bg-primary h-full block rounded-full"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
