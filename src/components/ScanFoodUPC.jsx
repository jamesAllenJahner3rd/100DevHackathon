import React from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanFoodUPC = () => {
  const [data, setData] = React.useState("Not Found");
const  beepSound = new Audio("../src/assets/sounds/beep.ogg");
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result){
               setData(result.text)
              beepSound.play().catch(err => console.error('Error playing beep:', err));
    } 
            else setData("Not Found");
          }}
        />
      </div>
      
      <p className="mt-4 text-lg font-semibold text-gray-700">{data}</p>
    </div>
  );
}

export default ScanFoodUPC