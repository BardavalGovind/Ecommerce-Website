import productModels from "../models/productModels.js";
import fs from 'fs'
import slugify from "slugify";

export const createProductController = async (req, res)=>{
    try{
        const {name, slug, description, price, category, quantity, shipping} = req.fields
        const {photo} = req.files;

        //validation

        switch(true){
            case !name:
                return res.status(500).send({error: 'Name is Required'})
            case !description:
                return res.status(500).send({error: 'description is Required'})
            case !price:
                return res.status(500).send({error: 'price is Required'})
            case !category:
                return res.status(500).send({error: 'category is Required'})
            case !quantity:
                return res.status(500).send({error: 'quantity is Required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error: 'photo is Required and should be less than 1mb'})
        }
        const products = new productModels({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in crearing product'
        })
    }
}