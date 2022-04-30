type Props = {
  content?: number;
};

const Cell: React.FC<Props> = ({ content }) => {
  let contentStyle = "";
  if (content === 1) {
    contentStyle = "text-blue-700";
  } else if (content === 2) {
    contentStyle = "text-green-700";
  } else if (content === 3) {
    contentStyle = "text-red-700";
  } else if (content === 4) {
    contentStyle = "text-lime-700";
  } else if (content === 5) {
    contentStyle = "text-orange-700";
  } else if (content === 6) {
    contentStyle = "text-indigo-700";
  } else if (content === 7) {
    contentStyle = "text-pink-700";
  } else if (content === 8) {
    contentStyle = "text-stone-700";
  }

  return (
    <div className="w-7 h-7 bg-gray-300 box-border border-2 border-l-gray-50 border-t-gray-50 border-r-gray-600 border-b-gray-600">
      <div className={`flex justify-center items-center font-black`}>
        {(() => {
          if (content === 0) {
            return <div></div>;
          } else if (content === -1) {
            return (
              <div className="w-full h-full bg-red-700 flex justify-center items-center">B</div>
            );
          } else {
            return <div className={contentStyle}>{content}</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default Cell;
