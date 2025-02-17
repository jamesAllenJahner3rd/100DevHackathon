import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import Foodlistings from '../components/FoodListings';
import ViewAllFoods from '../components/ViewAllFoods';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <Foodlistings isHome={true} />
      <ViewAllFoods />
    </>
  );
};
export default HomePage;
