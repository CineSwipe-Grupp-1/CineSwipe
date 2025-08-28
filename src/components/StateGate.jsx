// src/components/StateGate.jsx
export function StateGate({
  status,
  loading = <p role='status'>Laddar…</p>,
  error, // valfritt: custom ReactNode för error
  errorMessage = 'Något gick fel.',
  onRetry,
  children,
}) {
  if (status === 'loading') return loading;
  if (status === 'error') {
    if (error) return error;
    return (
      <div className='error-card' role='alert'>
        <p>{errorMessage}</p>
        {onRetry && <button onClick={onRetry}>Försök igen</button>}
      </div>
    );
  }
  return children ?? null;
}
