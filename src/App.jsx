import React, { useState } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import shhh from './shhh.js';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import FoodsPage from './pages/FoodsPage';
import NotFoundPage from './pages/NotFoundPage';
import FoodPage, { foodLoader } from './pages/FoodPage';
import AddFoodPage from './pages/AddFoodPage.jsx';
import EditFoodPage from './pages/EditFoodPage';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import { Client, Databases, ID } from "appwrite";

const App = () => {
  const [data, setData] = useState("Not Found");

  // APPWRITE DATABASE CONNECTION
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(shhh.PROJECT_ID);

  const databases = new Databases(client);

  // Add New Food
  const addFood = async (newFood) => {
    // Appwrite createDocument call
    const promise = databases.createDocument(
      shhh.DATABASE_ID,
      shhh.ITEM_ID,
      ID.unique(),
      newFood
    );

    promise.then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });

    // Fetch call to your API
    const res = await fetch('/api/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFood),
    });

    if (!res.ok) {
      console.error('Failed to add food via API');
    }

    return;
  };
// Add New Food
const getFood = async (listedFood) => {
  // Appwrite createDocument call
  const promise = databases.listDocument(
    shhh.DATABASE_ID,
    shhh.ITEM_ID,
    ID.unique(),
    listedFood
  );

  promise.then(function (response) {
    console.log(response);
  }, function (error) {
    console.log(error);
  });

  // Fetch call to your API
  const res = await fetch('/api/foods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFood),
  });

  if (!res.ok) {
    console.error('Failed to add food via API');
  }

  return;
};

  // Delete Food
  const deleteFood = async (id) => {
    const res = await fetch(`/api/foods/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Food
  const updateFood = async (food) => {
    const res = await fetch(`/api/foods/${food.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(food),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/foods' element={<FoodsPage />} />
        <Route path='/add-food' element={<AddFoodPage addFoodSubmit={addFood} />} />
        <Route
          path='/edit-food/:id'
          element={<EditFoodPage updateFoodSubmit={updateFood} />}
          loader={foodLoader}
        />
        <Route
          path='/foods/:id'
          element={<FoodPage deleteFood={deleteFood} />}
          loader={foodLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
