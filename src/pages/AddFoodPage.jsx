import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddFoodForm from '../components/AddFoodForm';
import ScanFoodUPC from '../components/ScanFoodUPC';

const AddFoodPage = ({ addFoodSubmit }) => {
  // Shared state
  const [title, setTitle] = useState('');
  const [upc, setUPC] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('Refrigerator');
  const [checkdate, setCheckdate] = useState('');
  const [category, setCategory] = useState('Fruit');
  const [images, setImages] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState('1');
  const [showScanForm, setShowScanForm] = useState(false);

  const navigate = useNavigate();

  // Shared functions
  const addWeeksToDate = (dateObj, numberOfWeeks) => {
    try {
      // Create a new date object to avoid mutating the original
      const newDate = new Date(dateObj);
      // Add weeks (7 days * number of weeks)
      const daysToAdd = numberOfWeeks * 7;
      newDate.setDate(newDate.getDate() + daysToAdd);
      return newDate.toISOString();
    } catch (error) {
      console.error('Error in addWeeksToDate:', error);
      return null;
    }
  };

  const handleCheckdateChange = (e) => {
    try {
      // Get the number of weeks from the select option
      const weeks = e.target.value;
      setSelectedWeeks(weeks); // Update the select value
      const numberOfWeeks = parseInt(weeks, 10);
      const currentDate = new Date();
      const newCheckdate = addWeeksToDate(currentDate, numberOfWeeks);
      if (newCheckdate) {
        setCheckdate(newCheckdate);
      }
    } catch (error) {
      console.error('Error in handleCheckdateChange:', error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const newFood = {
        title,
        upc,
        brand,
        model,
        location,
        category,
        images,
        description,
        checkdate,
      };
  
      console.log('Submitting new food:', newFood);
  
      await addFoodSubmit(newFood);
      toast.success('Food Added Successfully');
      navigate('/add-food');
    } catch (error) {
      console.error('Error submitting food:', error);
      toast.error('Failed to add food');
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='flex justify-center space-x-4 mb-6'>
          <button
            className={`px-4 py-2 rounded-lg ${
              !showScanForm ? 'bg-indigo-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setShowScanForm(false)}
          >
            Manual Entry
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              showScanForm ? 'bg-indigo-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setShowScanForm(true)}
          >
            Scan UPC
          </button>
        </div>
        
        {!showScanForm && (
          <AddFoodForm
            formData={{
              title,
              upc,
              brand,
              description,
              model,
              location,
              category,
              selectedWeeks,
              checkdate
            }}
            handlers={{
              setTitle,
              setUPC,
              setBrand,
              setDescription,
              setModel,
              setLocation,
              setCategory,
              handleCheckdateChange,
              submitForm
            }}
          />
        )}
        {showScanForm && (
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Scan UPC Code
            </h2>
            <ScanFoodUPC />
          </div>
        )}
      </div>
    </section>
  );
};

export default AddFoodPage;
