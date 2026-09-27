import express from"express"
import {downloads,download,addDownload,deleteDownload} from "../controller/downloadsController.js"
import {authenticate} from "../middleware/authenticate.js"
const downloadsRouter=express.Router()
downloadsRouter.get("/",authenticate,downloads);
downloadsRouter.get("/:id",authenticate,download);
downloadsRouter.delete("/:id",authenticate,deleteDownload);
downloadsRouter.post("/:id", authenticate, addDownload);
export{downloadsRouter};