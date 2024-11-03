import { IoMdSend } from "react-icons/io";
function DisplayComposeBlock() {
  return (
    <>
      <div className="h-full px-3">
        <div className="w-full h-[7vh] border-b-2 border-gray-700 flex items-center">
          <div className="text-gray-400">To: </div>
          <input
            type="text"
            className="text-white w-full h-[7vh] bg-transparent px-3 focus:outline-none"
          />
          <IoMdSend className="text-white text-3xl" />
        </div>
        <div className="w-full h-[7vh] border-b-2 border-gray-700 flex items-center">
          <div className="text-gray-400">Subject: </div>
          <input
            type="text"
            className="text-white w-full h-[7vh] bg-transparent px-3 focus:outline-none"
          />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <textarea
            name=""
            id=""
            className="bg-transparent w-full h-full p-4 text-white focus:outline-none"
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default DisplayComposeBlock;
