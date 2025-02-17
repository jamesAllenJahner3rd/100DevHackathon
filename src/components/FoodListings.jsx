import { useState, useEffect } from 'react';
import FoodListing from './FoodListing';
import Spinner from './Spinner';
import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

const FoodListings = ({ isHome = false }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_ITEM_ID,
          [
            Query.limit(isHome ? 3 : 100) // Adjust the limit based on isHome
          ]
        );
        
        setFoods(response.documents);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [isHome]);

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
              <FoodListing key={food.$id} food={food} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodListings;
