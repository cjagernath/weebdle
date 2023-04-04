interface HeaderProps {
  dailyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ dailyCount }) => {
  return (
    <div>
      <h1 className="text-5xl font-bold">WEEBDLE #{dailyCount}</h1>

      <label htmlFor="my-modal" className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1>Statistics</h1>
          <div>1: 1</div>
          <div>2: 3</div>
          <div>3: 4</div>
          <div>4: 12</div>
          <div>5: 16</div>
          <div>6: 10</div>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
