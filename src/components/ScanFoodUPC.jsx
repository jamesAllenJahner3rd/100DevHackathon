import React from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanFoodUPC = () => {
  const [data, setData] = React.useState("Not Found");

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg mx-auto">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
            else setData("Not Found");
          }}
        />
      </div>
      
      <p className="mt-4 text-lg font-semibold text-gray-700">{data}</p>
    </div>
  );
}

export default ScanFoodUPC