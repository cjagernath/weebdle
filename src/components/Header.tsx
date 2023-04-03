interface HeaderProps {
  dailyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ dailyCount }) => {
  return <h1 className="text-5xl font-bold">WEEBDLE #{dailyCount}</h1>;
};
