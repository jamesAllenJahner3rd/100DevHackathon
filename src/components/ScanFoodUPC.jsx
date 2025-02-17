import React, { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanFoodUPC = () => {
  const [data, setData] = useState("Not Found");
  const [isScanning, setIsScanning] = useState(false);
  const beepSound = new Audio("../src/assets/sounds/beep.ogg");

  const fetchUPCData = async (upc) => {
    try {
      console.log('Fetching UPC:', upc);
      
      const response = await fetch(`/upc/${upc}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API Response:', data);

      if (data.success === true) {
        const productData = {
          title: data.title || '',
          upc: data.barcode || '',
          brand: data.brand || '',
          description: data.description || '',
          model: data.metadata?.ingredients || '',
          category: data.category === 'Food' ? 'Other' : data.category
        };

        console.log('Processed UPC Data:', productData);
        return productData;
      }
    } catch (error) {
      console.error('Error fetching UPC data:', error);
      return null;
    }
  };

  const handleScan = async (err, result) => {
    if (!isScanning) {
      return;
    }

    if (result) {
      const scannedData = result.text;
      console.log('Valid UPC found:', scannedData);
      setData(scannedData);
      beepSound.play().catch(err => console.error('Error playing beep:', err));
      setIsScanning(false);
      
      // Fetch and log UPC data
      await fetchUPCData(scannedData);
    }
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      setData("Not Found");
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