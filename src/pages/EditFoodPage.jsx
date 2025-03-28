import React,{ useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditFoodPage = ({ updateFoodSubmit }) => {
  const food = useLoaderData();
  const [title, setTitle] = useState(food.title);
  const [upc, setUPC] = useState(food.upc);
  const [location, setLocation] = useState(food.location);
  const [description, setDescription] = useState(food.description);
  const [brand, setBrand] = useState(food.brand);
  const [checkdate, setCheckdate] = useState(food.checkdate);
  const [category, setCategory] = useState(food.category);
  const [images, setImages] = useState(food.images);

  const navigate = useNavigate();
  const { id } = useParams();
  let  type, checkdateName, checkdateDescription;
  const submitForm = (e) => {
    e.preventDefault();
  

    const updatedFood = {
      id,
      title,
      type,
      location,
      description,
      brand,
      checkdate: {
        name: checkdateName,
        description: checkdateDescription,
        category,
        images,
      },
    };

    updateFoodSubmit(updatedFood);

    toast.success('Food Updated Successfully');

    return navigate(`/foods/${id}`);
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update food
            </h2>

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
                <option value='Vegi'>Vegetable</option>
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
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                UPC
              </label>
              <textarea
                id='upc'
                name='upc'
                className='border rounded w-full py-2 px-3'
                required
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
                Checkdate Name
              </label>
              <select
                type='datetime'
                id='checkdate'
                name='checkdate'
                className='border rounded w-full py-2 px-3'
                placeholder='When should we check the date'
                value={checkdate}
                onChange={(e) => setCheckdateName(e.target.value)}
              >
              <option value="9999-12-31 23:59:58">1 Week</option>
              <option value="9999-12-31 23:59:57">2 Weeks</option>
              <option value="9999-12-31 23:59:56">1 Month</option>
              <option value="9999-12-31 23:59:55">6 Month</option>
              <option value="9999-12-31 23:59:59">1 Year</option>
            </select>
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update food
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default EditFoodPage;
