export const ResetButton = ({ onReset }: { onReset: () => void }) => (
  <button
    onClick={onReset}
    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md font-bold"
  >
    Reset Tournament
  </button>
);
