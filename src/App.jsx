import { useState } from "react";

function App() {
  const number = [
    "AC",
    "DEL",
    "/",
    "/",
    1,
    2,
    3,
    "*",
    4,
    5,
    6,
    "+",
    7,
    8,
    9,
    "-",
    ".",
    0,
  ];

  const combinedButtonClass = `bg-gray-200 font-semibold select-none text-2xl text-center items-center justify-center flex hover:bg-gray-300 hover:text-gray-900 hover:shadow-md cursor-pointer`;
  const [expression, setExpression] = useState("");

  const handleEvaluate = () => {
    try {
      const sanitizedExpression = expression.replace(/--+/g, "+"); // Replace multiple consecutive minus signs

      // Check for invalid sequences of operators using regular expressions
      if (/[-+*/.]{2,}/.test(sanitizedExpression)) {
        throw new Error("Syntax Error");
      }

      const result = eval(sanitizedExpression); // Evaluate the expression

      if (isNaN(result) || !isFinite(result)) {
        throw new Error("Syntax Error");
      }
      setExpression(result.toString()); // Set the expression to the result
    } catch (error) {
      // Handle error if the expression is invalid or there's a syntax error
      setExpression("Syntax Err");
    }
  };

  return (
    <div className="bg-gradient-to-br grid place-items-center from-gray-800 to-gray-900 h-screen">
      <div className="w-[40%] gap-0.5 md:w-[30%] grid grid-template-rows: repeat(3, 1fr) 1fr grid-cols-4 text-black text-lg h-[90%] bg-white">
        <div className="bg-gray-900 row-span-2 col-span-4 text-white font-semibold text-right flex flex-col justify-end">
          <p className="bottom-5 right-5 text-5xl relative">{expression}</p>
        </div>
        <div
          className={`${combinedButtonClass} col-span-2 `}
          onClick={() => setExpression("")}
        >
          AC
        </div>
        <div
          className={combinedButtonClass}
          onClick={(e) => setExpression((prev) => prev.slice(0, -1))}
        >
          DEL
        </div>
        {number.slice(3).map((item, index) => (
          <div
            key={index}
            className={combinedButtonClass}
            onClick={(e) => setExpression((prev) => prev + e.target.innerText)}
          >
            {item}
          </div>
        ))}
        <div
          className={`${combinedButtonClass} col-span-2`}
          onClick={handleEvaluate}
        >
          =
        </div>
      </div>
    </div>
  );
}

export default App;
