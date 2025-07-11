export function AppError({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <p className="text-sm text-destructive">{errorMessage}</p>
    </div>
  );
}
