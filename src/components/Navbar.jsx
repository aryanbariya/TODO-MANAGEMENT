// import React from 'react'

// function Navbar() {
//   return (
//     <nav className='flex justify-between bg-purple-400 text-white py-2 p-5'>
//       <div className="logo">
//          <span className=" font-bold text-2xl mx-8 py-2 ">TODO</span>   
//       </div>
//        <ul className="flex gap-7  mx-10">
//         <li className='text-white cursor-pointer hover:bold py-2'>Home</li>
//         <li className='text-white cursor-pointer py-2'>Your Tasks</li>
//         </ul> 
//     </nav>
//   )
// }

// export default Navbar
import React from 'react';

function Navbar({ toggleTasks }) {
  return (
    <nav className="flex justify-between bg-purple-400 text-white py-2 p-5">
      <div className="logo">
        <span className="font-bold text-2xl mx-8 py-2">TODO</span>
      </div>
      <ul className="flex gap-7 mx-10">
        <li className="text-white cursor-pointer hover:bold py-2">Home</li>
        <li className="text-white cursor-pointer py-2"onClick={toggleTasks}>Your Tasks</li>
      </ul>
    </nav>
  );
}

export default Navbar;
