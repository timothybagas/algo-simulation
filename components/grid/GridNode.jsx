import { MdOutlineMyLocation } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";

export default function GridNode({
  row,
  col,
  isStartNode,
  isTargetNode,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  return (
    <div
      id={`node-${row}-${col}`}
      className={`w-[40px] h-[40px] border border-gray-300 ${!isStartNode && !isTargetNode && isWall ? 'bg-gray-800' : ''} cursor-pointer duration-200 ease-in`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    >
      <div className="flex justify-center items-center h-full p-2 hover:p-1 duration-200 ease-in">
        {isStartNode && <MdOutlineMyLocation className="w-full h-full" />}
        {isTargetNode && <ImLocation2 className="w-full h-full" />}
      </div>
    </div>
  )
}