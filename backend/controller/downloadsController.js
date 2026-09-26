//downloads, downloads/:id, deletedownloads
import {db} from "src/prisma/db.js"
const downloads=async (req,res,next)=>{
    try{
        const downloads=await db.orm.public.Download.findMany();
        if(downloads.length===0){
           return res.status(404).json({message:"doownloads is empty"})
        }
          res.status(200).json(downloads)
    }catch(error){
        next(error)
    }
};
const download=async(req,res,next)=>{
    try{
        const id=Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }
        const download=await db.orm.public.Download.findUnique({
            where:{
                id:id
            }
        })
        if(!download){
            return res.status(404).json({message:"download movie not found"})
        }
        res.status(200).json(download)
        
    }catch(error){
        next(error)
    }
}
const deleteDownload = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid download ID"
            });
        }

        const download = await db.orm.public.Download.findUnique({
            where: {
                id
            }
        });

        if (!download) {
            return res.status(404).json({
                message: "Download not found"
            });
        }

        await db.orm.public.Download.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Download deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
export{downloads,download,deleteDownload}