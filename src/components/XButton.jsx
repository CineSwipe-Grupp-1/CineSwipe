export function XButton({ onClick }) {
  return (
    <button
      className='x-button'
      type='button'
      onClick={onClick}
      aria-label='Dislike'
    >
      X
    </button>
  );
}
