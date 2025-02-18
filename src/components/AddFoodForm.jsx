const AddFoodForm = ({ formData, handlers }) => {
  const {
    title,
    upc,
    brand,
    description,
    model,
    location,
    category,
    selectedWeeks,
    checkdate
  } = formData;

  const {
    setTitle,
    setUPC,
    setBrand,
    setDescription,
    setModel,
    setLocation,
    setCategory,
    handleCheckdateChange,
    submitForm
  } = handlers;

  return (
    <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
      <form onSubmit={submitForm} id='addFoodForm'>
        <h2 className='text-3xl text-center font-semibold mb-6'>Add Food</h2>

        <div className='flex flex-wrap mb-4'>
          <div className='w-full md:w-1/2 pr-2'>
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
              <option value='Dairy'>Dairy</option>
              <option value='Beverage'>Beverage</option>
              <option value='Snacks'>Snacks</option>
              <option value='Frozen'>Frozen</option>
              <option value='Canned'>Canned</option>
              <option value='Condiments'>Condiments</option>
              <option value='Seafood'>Seafood</option>
              <option value='Grains'>Grains</option>
              <option value='Sweets'>Sweets</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='w-full md:w-1/2 pl-2'>
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
            htmlFor='checkdate'
            className='block text-gray-700 font-bold mb-2'
          >
            Check for Rot?
          </label>
          <select
            type='number'
            id='checkdate'
            name='checkdate'
            className='border rounded w-full py-2 px-3'
            placeholder='When should we check the date'
            value={selectedWeeks}
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
  );
};

export default AddFoodForm;
