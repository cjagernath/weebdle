interface HeaderProps {
  dailyCount: number;
  onClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ dailyCount, onClick }) => {
  const handleClickSubmit = () => {
    onClick();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <label className=" swap swap-rotate">
          <input type="checkbox" onClick={handleClickSubmit} />

          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div className="navbar-center">
        <h1 className="text-5xl font-bold">Weebdle #{dailyCount}</h1>
      </div>
      <div className="navbar-end">
        <label htmlFor="DMCA" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M3 9C3 7.89543 3.89543 7 5 7H6.5C7.12951 7 7.72229 6.70361 8.1 6.2L9.15 4.8C9.52771 4.29639 10.1205 4 10.75 4H13.25C13.8795 4 14.4723 4.29639 14.85 4.8L15.9 6.2C16.2777 6.70361 16.8705 7 17.5 7H19C20.1046 7 21 7.89543 21 9V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V9Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="13"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>

        <label htmlFor="stats" className="btn">
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

        <label htmlFor="rules" className="btn">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </label>
      </div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="DMCA" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-3xl font-bold">DMCA Request</h1>
          <br />
          <div>
            To request images to no longer be supported on the site, please send
            a request through email to weebdle@gmail.com with the following
            info:
          </div>
          <br />
          <div className="text-left">Subject: DMCA Infringement Notice</div>
          <br />
          <div className="text-left">
            Name of IP Holder requesting the removal.
          </div>
          <br />
          <div className="text-left">
            A legal certification that you represent the IP Holder in this
            matter.
          </div>
          <br />
          <div className="text-left">Address and contact information.</div>
          <br />
          <div className="text-left">Name of IP URLs of Images to remove</div>
          <br />
          <div className="text-left">
            Name of IP #2 URLs of Images to remove
          </div>
          <br />
          <div className="text-left">
            Missing information means we will be unable to handle your request.
            We should be able to get to it within 24-72 hours.
          </div>

          <div className="modal-action">
            <label htmlFor="DMCA" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="stats" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-3xl font-bold">Statistics</h1>
          <div>1: 1</div>
          <div>2: 3</div>
          <div>3: 4</div>
          <div>4: 12</div>
          <div>5: 16</div>
          <div>6: 10</div>
          <div className="modal-action">
            <label htmlFor="stats" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="rules" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-3xl font-bold">How to play:</h1>
          <br />
          <div>
            <p className="text-left">
              1. Each day, a new anime will be randomly selected by the game.
            </p>
            <p className="text-left">
              2. You will have six chances to guess the name of the anime.
            </p>
            <p className="text-left">
              3. Each time you make a wrong guess, another frame of the anime
              will be revealed to you to help you guess.
            </p>
            <p className="text-left">
              4. To make a guess, type the name of the anime into the input
              field provided and click "Submit".
            </p>
            <p className="text-left">
              5. If you guess the correct anime within the six tries, you win
              the game.
            </p>
            <p className="text-left">
              6. If you do not guess the correct anime within six tries, you
              lose the game.
            </p>
            <p className="text-left">
              7. You can play the game again the next day to try to guess a new
              randomly selected anime.
            </p>
          </div>

          <div className="modal-action">
            <label htmlFor="rules" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
