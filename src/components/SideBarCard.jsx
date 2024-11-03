import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function SideBarCard({ subject, fromEmail, message }) {
  return (
    <div
      className={`bg-gray-700 w-full h-[15vh] flex p-4 text-white rounded-md mb-2 ${dmsans.classname}`}
    >
      <div className="w-full">
        <div className="text-md font-medium truncate">{subject}</div>
        <div className="text-sm text-gray-400 mb-1">From: {fromEmail}</div>
        <div className="text-sm text-gray-300 line-clamp-2 overflow-hidden">
          {message}
        </div>
      </div>
    </div>
  );
}

export default SideBarCard;
