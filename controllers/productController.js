import productModels from "../models/productModels.js";
import categoryModel from "../models/categoryModel.js";
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
            products.photo.contentType = photo.type
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

//get all products
export const getProductController = async (req, res)=>{
    try{
        const products = await productModels
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
        res.status(200).send({
            countTotal: products.length,
            success: true,
            message: "AllProducts",
            products,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting products',
            error: error.message
        })
    }
}

// get single products
export const getSingleProductController = async (req, res)=>{
    try{
        const product = await productModels
        .findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category");

        res.status(200).send({
            success:true,
            message:'Single Product Fetched',
            product
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while getting single product',
        })
    }
}


// get photo
export const productPhotoController = async (req, res)=>{
    try{
        const product = await productModels.findById(req.params.pid).select("photo");
        if (!product || !product.photo || !product.photo.data) {
            return res.status(404).send({ success: false, message: "Photo not found" });
        }
        res.set("Content-Type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:'Error while getting photo',
            error
        })
    }
}

//delete controller
export const deleteProductController = async (req, res)=>{
    try{
        await productModels.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'Product Deleted successfully'
        })
    }
    catch(error){
        console.log(error);
        res.staus(500).send({
            success:false,
            message:'Error while deleting product',
            error
        })
    }
}


//update product
export const updataProductController = async (req, res)=>{
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
        const products = await productModels.findByIdAndUpdate(req.params.pid, 
            {...req.fields, slug:slugify(name)}, {new:true}
        )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating product'
        })
    }
};


//filters
export const productFiltersController = async (req, res)=>{
    try{
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModels.find(args);
        res.status(200).send({
            success: true,
            products,
        });

    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error while Filtering Products',
            error
        })
    }
}

//product count
export const productCountController = async (req, res)=>{
    try{
        const total = await productModels.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total,
        })
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            message:'Error in product count',
            error,
            success:false
        })
    }
};

//product list base on page
export const productListController = async (req, res)=>{
    try{
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModels
        .find({}).select("-photo")
        .skip((page-1) * perPage)
        .limit(perPage)
        .sort({createdAt:-1});
        res.status(200).send({
            success: true,
            products,
        });

    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'error in per page clrl',
            error
        })
    }
}

//search product
export const searchProductController = async (req, res)=>{
    try{
        const {keyword} = req.params
        const results = await productModels.find({
            $or: [
                {name:{$regex : keyword, $options:"i"}},
                {description:{$regex : keyword, $options:"i"}}, 
            ]
        }).select("-photo");
        res.json(results);
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error in search product API',
        })
    }
}

// similar products
export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await productModels
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };

// get product by category
export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModels.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };
