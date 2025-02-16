import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import FoodListings from '../components/FoodListings';
import ViewAllFoods from '../components/ViewAllFoods';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <FoodListings isHome={true} />
      <ViewAllFoods />
    </>
  );
};
export default HomePage;
