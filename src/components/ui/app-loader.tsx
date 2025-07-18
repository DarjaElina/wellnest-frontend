export function AppLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-muted-foreground animate-in fade-in">
      <img
          src="/logo.png"
          alt="loading"
          className="w-12 h-12 animate-bounce rounded-full drop-shadow"
        />

      <p className="text-sm">Loading, just a moment…</p>
    </div>
  );
}