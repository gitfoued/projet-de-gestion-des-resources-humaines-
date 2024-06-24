import React, { useState, useEffect } from 'react';
import Anim_ligne from "../Components/Anim_ligne";
import Cercle_Anim from "../Components/Cercle_Anim";

function Anim_page() {
  const [showLine, setShowLine] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLine(false);
    }, 1500); // Disparition de la ligne après 1 seconde

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='  bg-indigo-900 w-screen bg-cover h-screen  '>
      {showLine ? (
        <Anim_ligne />
      ) : (
        <Cercle_Anim />
      )}
    </div>
  );
}

export default Anim_page;
