import { useState, useEffect } from 'react';
import foodListing from './FoodListing';
import Spinner from './Spinner';

const foodListings = ({ isHome = false }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const apiUrl = isHome ? '/api/foods?_limit=3' : '/api/foods';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setFoods(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent foods' : 'Browse foods'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {foods.map((food) => (
              <FoodListing key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default foodListings;
