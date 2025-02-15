import './style.css'
import{ shh } from "./shh.js"
import { Client, Databases, ID, Query } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(shh.PROJECT_ID);

const databases = new Databases(client);



const form = document.querySelector('form');
form.addEventListener('submit', addJob);

async function addJob(e) {
    e.preventDefault();
    const promise = databases.createDocument(
        shh.DATABASE_ID,
        shh.COLLECTION_ID,
        ID.unique(),
        { 
            "company-name":    e.target.companyName.value,
            "date-added":      e.target.dateAdded.value,
            "roll":            e.target.roll.value,
            "location":        e.target.location.value,
            "position-type":   e.target.positionType.value,
            "source":          e.target.source.value
        }
    );
    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

    form.reset();
}

;
function addJobToDOM(job){
    let div = document.body.appendChild("div");
    let promise = databases.listDocuments(
    shh.DATABASE_ID,
    shh.COLLECTION_ID,
);
    promise.then(function (response) {
    console.log(response);
},  function (error) {
    console.log(error);
});
}
addJobToDOM();
