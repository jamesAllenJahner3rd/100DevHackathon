import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import foodListings from '../components/FoodListings';
import ViewAllFoods from '../components/ViewAllFoods';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <foodListings isHome={true} />
      <ViewAllFoods />
    </>
  );
};
export default HomePage;
