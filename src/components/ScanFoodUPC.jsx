import React, { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanFoodUPC = () => {
  const [data, setData] = useState("Not Found");
  const [isScanning, setIsScanning] = useState(false);
  const beepSound = new Audio("../src/assets/sounds/beep.ogg");

  const handleScan = (err, result) => {
    // Only process if scanning is active
    if (!isScanning) {
      return;
    }

    if (result) {
      // Valid barcode found
      const scannedData = result.text;
      console.log('Valid UPC found:', scannedData);
      setData(scannedData);
      beepSound.play().catch(err => console.error('Error playing beep:', err));
      setIsScanning(false); // Stop scanning after successful scan
    }
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      setData("Not Found"); // Reset data when starting new scan
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="w-full max-w-lg mx-auto relative cursor-pointer"
        onClick={toggleScanning}
      >
        {isScanning ? (
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={handleScan}
            facingMode="environment"
            torch={false}
          />
        ) : (
          <div className="h-[500px] w-[500px] bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-xl">
              {data === "Not Found" ? "Tap to scan" : "Tap to scan again"}
            </p>
          </div>
        )}
      </div>
      
      <p className="mt-4 text-lg font-semibold text-gray-700">
        {isScanning ? "Scanning..." : data}
      </p>
      
      <div className="mt-2 text-sm text-gray-500">
        {isScanning ? (
          <span className="text-blue-500">Looking for barcode...</span>
        ) : (
          <span>Tap camera to {data === "Not Found" ? "scan" : "scan again"}</span>
        )}
      </div>
    </div>
  );
};

export default ScanFoodUPC;