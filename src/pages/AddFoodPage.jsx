import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddFoodPage = ({ addFoodSubmit }) => {
  const [title, setTitle] = useState('');
  const [upc, setUPC] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('Refrigerator');
  const [checkdate, setCheckdate] = useState('');
  const [category, setCategory] = useState('Fruit');
  const [images, setImages] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState('1'); // Add this new state

  const navigate = useNavigate();

  const addWeeksToDate = (dateObj, numberOfWeeks) => {
    try {
      // Create a new date object to avoid mutating the original
      const newDate = new Date(dateObj);
      // Add weeks (7 days * number of weeks)
      const daysToAdd = numberOfWeeks * 7;
      newDate.setDate(newDate.getDate() + daysToAdd);
  
      // Debug logging
      alert(`
        Adding weeks:
        Original date: ${dateObj}
        Weeks to add: ${numberOfWeeks}
        Days to add: ${daysToAdd}
        New date: ${newDate.toISOString()}
      `);
  
      return newDate.toISOString();
    } catch (error) {
      console.error('Error in addWeeksToDate:', error);
      alert('Error adding weeks to date: ' + error.message);
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
  
      // Debug logging
      alert(`
        Handling checkdate change:
        Selected weeks: ${numberOfWeeks}
        Current date: ${currentDate.toISOString()}
      `);
  
      // Calculate new date
      const newCheckdate = addWeeksToDate(currentDate, numberOfWeeks);
      
      if (newCheckdate) {
        setCheckdate(newCheckdate);
        // Confirm the state was updated
        alert(`Checkdate updated to: ${newCheckdate}`);
      }
    } catch (error) {
      console.error('Error in handleCheckdateChange:', error);
      alert('Error handling checkdate change: ' + error.message);
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
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm} id='addFoodForm'>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add food</h2>

            <div className='mb-4'>
              <label
                htmlFor='category'
                className='block text-gray-700 font-bold mb-2'
              >
                Food Type
              </label>
              <select
                id='category'
                name='category'
                className='border rounded w-full py-2 px-3'
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='Fruit'>Fruit</option>
                <option value='Vegetable'>Vegetable</option>
                <option value='Meat'>Meat</option>
                <option value='Bread'>Bread</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Food Listing Name
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Tomato'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any food duties, expectations, requirements, etc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='upc'
                className='block text-gray-700 font-bold mb-2'
              >
                UPC
              </label>
              <textarea
                id='upc'
                name='upc'
                className='border rounded w-full py-2 px-3'
                value={upc}
                onChange={(e) => setUPC(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='location'
                className='block text-gray-700 font-bold mb-2'
              >
                Location
              </label>
              <select
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Kitchen Location'
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value='refrigerator'>Refrigerator</option>
                <option value='freezer'>Freezer</option>
                <option value='pantry'>Pantry</option>
              </select>
            </div>

            <h3 className='text-2xl mb-5'>Checkdate Info</h3>

            <div className='mb-4'>
              <label
                htmlFor='checkdate'
                className='block text-gray-700 font-bold mb-2'
              >
                Checkdate
              </label>
              <select
                type='number'
                id='checkdate'
                name='checkdate'
                className='border rounded w-full py-2 px-3'
                placeholder='When should we check the date'
                value={selectedWeeks} // Changed from checkdate to selectedWeeks
                onChange={handleCheckdateChange}
              >
                <option value="1">1 Week</option>
                <option value="2">2 Weeks</option>
                <option value="4">1 Month</option>
                <option value="24">6 Months</option>
                <option value="52">1 Year</option>
              </select>
            </div>
            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add food
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddFoodPage;
