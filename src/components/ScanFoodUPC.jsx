import React, { useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanFoodUPC = ({ setData }) => {
  const [isScanning, setIsScanning] = useState(false);
  const beepSound = new Audio("../src/assets/sounds/beep.ogg");
  const beepSoundassets = new Audio("../src/assets/beep.ogg");
  const beepSoundsrc = new Audio("../src/beep.mp3");
  const fetchUPCData = async (upc) => {
    try {
      console.log('Fetching UPC:', upc);

      const response = await fetch(`/upc/${upc}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Fetch response:', response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API Response:', data);

      if (data.success === true) {
        let upcCode = data.barcode || '';

        // Convert 12-digit UPC to 13-digit EAN by adding the country code 0
        if (upcCode.length === 12) {
          upcCode = '0' + upcCode;
        }

        const productData = {
          title: data.title || '',
          upc: upcCode,
          brand: data.brand || '',
          description: data.description || '',
          model: data.metadata?.ingredients || '',
          category: data.category === 'Food' ? 'Other' : data.category
        };

        console.log('Processed UPC Data:', productData);
        setData(productData); // Update data in AddFoodPage
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
      beepSound.play().catch(err => console.error('Error playing beep:', err));
      beepSoundassets.play().catch(err => console.error('Error playing beep:', err));
      beepSoundsrc.play().catch(err => console.error('Error playing beep:', err));
      setIsScanning(false);

      // Fetch and log UPC data
      await fetchUPCData(scannedData);
    }
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <audio id="beepSound" src="../src/assets/sounds/beep.ogg" type="audio/ogg; codecs=vorbis"></audio>
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
          <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-xl">
              {isScanning ? "Tap to stop scanning" : "Tap to start scanning"}
            </p>
          </div>
        )}
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">
        {isScanning ? "Scanning..." : "Not Scanning"}
      </p>
    </div>
  );
};

export default ScanFoodUPC;
