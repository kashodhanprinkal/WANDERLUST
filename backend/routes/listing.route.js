import express from 'express'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { addListing,deleteListing, getListing , findListing, updateListing } from '../controller/listing.controller.js'

let ListingRouter = express.Router()

ListingRouter.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  addListing
);

ListingRouter.get("/get",getListing)
ListingRouter.get("/findlistingbyid/:id",isAuth,findListing)
ListingRouter.delete("/delete/:id",isAuth,deleteListing)

ListingRouter.put(
  "/update/:id",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  updateListing
);

export default ListingRouter;
 