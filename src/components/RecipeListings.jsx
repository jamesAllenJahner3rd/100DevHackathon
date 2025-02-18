import { useState, useEffect } from 'react';
import FoodListing from './FoodListing';
import Spinner from './Spinner';
import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
const databases = new Databases(client);

const RecipeListings = ({ isHome = false }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState([])

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
        let dateFood = response.documents
        let arr = Object.entries(dateFood).sort(([,a], [,b]) => {
          Date.parse(new Date(a.checkdate.toString())) - Date.parse(new Date(b.checkdate.toString()))
        }).reduce((r, [k, v]) => ({ ...r, [k]: v}), {})
        console.log(arr)
        console.log(dateFood)
        
        // FIX: for some reason i couldnt get the json data
        // await fetch('www.themealdb.com/api/json/v1/1/list.php?i=list').then(res => {
        await fetch('www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast').then(res => {
          // res.json()
          console.log(res)
        // }).then(data => {
        //     console.log(data)
          })
        Object.keys(dateFood).forEach((key, index) => {
          // console.log(dateFood[key].title.toLowerCase().split(' ').join('_'))
          // console.log(Date.parse(new Date(dateFood[key].checkdate.toString())))
          // console.log()
        })
        console.log(response.documents[21].title)
        console.log(response.documents[21].checkdate)
        console.log(dateFood)
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
          {isHome ? 'Recent recipe' : 'Browse recipe'}
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

export default RecipeListings;
