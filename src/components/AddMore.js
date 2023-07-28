import React, { useState } from "react";
function AddMore() {
  const [data, setData] = useState([]);

  const addItem = () => {
    setData([
      ...data,
      {
        id: data.length,
        term: "",
        defination: "",
        image: "",
      },
    ]);
  };

  const remove = () => {
    var elem = document.getElementById("termDiv");
    elem.parentNode.removeChild(elem);
    // data.splice(index, 1);
  };

  return (
    <>
      {/* Try Btn here  for ol */}

      <ol>
        {data.map((data) => {
          return (
            <div className="flex my-3 p-3" id="termDiv">
              <div>
                <li key={data.id}>{/* {data.id} */}</li>
              </div>
              <div>
                <label htmlFor="term">Enter Term*</label>
                <input
                  name="term"
                  type="text"
                  placeholder="write your term name "
                />
              </div>
              <div>
                <label htmlFor="defination">Enter Defination*</label>
                <input
                  name="defination"
                  type="text"
                  placeholder="write your term name "
                />
              </div>

              <div>
                <button onClick={remove}>Delete</button>,<button>Edit</button>,
              </div>
            </div>
          );
        })}

        <button className=" text-blue-700 flex  " onClick={addItem}>
          + Add More
        </button>
      </ol>
    </>
  );
}
export default AddMore;

///////////////////////////////////////////////////////////////////////OLd/////////////////
// import React, { useState } from "react";

// function CreateNew() {
//   const [data, setData] = useState([]);

//   const addItem = () => {
//     setData([
//       ...data,
//       {
//         id: data.length,
//       },
//     ]);
//   };

//   const remove = () => {
//     var elem = document.getElementById("node");
//     elem.parentNode.removeChild(elem);
//   };

//   return (
//     <div>
//       <button onClick={addItem}>Create New</button>

//       <ol>
//         {data.map((data) => {
//           return (
//             <ol>
//               <div id="node">
//                 <li key={data.id}> {data.term}</li>
//                 <input type="text" placeholder="write your term name " />
//                 <button onClick={remove}>Delete</button>,<button>Edit</button>,
//               </div>
//             </ol>
//           );
//         })}
//       </ol>
//     </div>
//   );
// }
// export default CreateNew;
//////////////////////////////////////////////////////////////////////////////////
