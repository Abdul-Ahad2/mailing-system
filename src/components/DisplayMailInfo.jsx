import { DM_Sans } from "next/font/google";
import { MdDelete } from "react-icons/md";

const dmsans = DM_Sans({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

function DisplayMailInfo({ name, subject, fromEmail, message }) {
  return (
    <div className={`h-full ${dmsans.className}`}>
      <div className="text-white">
        <div className="bg-gray-800 h-[13vh] flex items-center justify-between p-4">
          <div>
            <div className="flex items-center">
              <div className="bg-white rounded-full w-7 h-7 mr-3"></div>
              <div className="text-2xl font-bold">{name}</div>
            </div>
            <div className="">Subject: {subject}</div>
            <div className="text-gray-400">From: {fromEmail}</div>
          </div>
          <div>
            <MdDelete className="text-3xl" />
          </div>
        </div>
        <div className="p-4 pr-32">
          <div className="text-gray-300 leading-relaxed">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayMailInfo;
