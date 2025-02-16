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
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import { Client, Databases, ID } from "appwrite";
const App = () => {
  const [data, setData] = useState("Not Found");

// APPWRITE DATABASE CONNENCTION
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(shhh.PROJECT_ID);

const databases = new Databases(client);

const promise = databases.createDocument(
  shhh.DATABASE_ID,
  shhh.ITEM_ID,
  ID.unique(),
  {       
      "title": "TAMALES BEEF IN CHILI SAUCE",
      "description": "INGREDIENTS: WATER, BEEF, TOMATOES (WATER, TOMATO PASTE), CORN MEAL, CORN FLOUR, CONTAINS 2% OR LESS OF MODIFIED CORNSTARCH (CONTAINS ERYTHORBIC ACID), MASA FLOUR (GROUND YELLOW CORN, TRACE OF LIME), SALT, CHILI POWDER (CHILI PEPPERS, FLAVORING), PAPRIKA, SPICE.",
      "upc": "037600216296",
      "brand": "Hormel",
      "model": "Tamales in Chili Sauce",
      "color": "Gold",
      "size": "Package size of 15.0 oz",
      "dimension": "12 X 5 X 8 inches",
      "weight": "180 ounces",
      "category": "Food, Beverages & Tobacco > Food Items > Snack Foods > Crackers",
      "images": [
        "http://c.shld.net/rpx/i/s/i/spin/10127449/prod_ec_1577405702",
        "https://i5.walmartimages.com/asr/84763c3a-dd8b-40ed-9ff4-22320f47d858.8578c8dc2d512e03e56a94a27bd02221.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff"] 
  }
);

promise.then(function (response) {
  console.log(response);
}, function (error) {
  console.log(error);
});

  // // Add New Job
  // const addJob = async (newJob) => {
  //   const res = await fetch('/api/jobs', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newJob),
  //   });
  //   return;
  // };

  // // Delete Job
  // const deleteJob = async (id) => {
  //   const res = await fetch(`/api/jobs/${id}`, {
  //     method: 'DELETE',
  //   });
  //   return;
  // };

  // // Update Job
  // const updateJob = async (job) => {
  //   const res = await fetch(`/api/jobs/${job.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(job),
  //   });
  //   return;
  // };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
            else setData("Not Found");
          }}
        />
        <p className="mt-4 text-lg">{data}</p>
      </div>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
