import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});

    //intial details
    useEffect(()=>{
        if(params?.slug) getProduct()
    }, [params?.slug]);
    //getproduct
    const getProduct = async ()=>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    
        <Layout>
            <div className='row container mt-2'>
                <div className='col-md-6'>
                    <img 
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className='card-img-top'
                        alt={product.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
            </div>
            <div className='col-md-6'>
                <h1 className='text-center'>Product Details</h1>
                <h6>Name : {product?.name}</h6>
                <h6>Description : {product?.description}</h6>
                <h6>Category : {product?.category?.name}</h6>
                <button className='btn btn-secondary ms-1'>ADD TO CART</button>
            </div>
            <div className='row'>Similar products</div>
        </Layout>
  )
}
export default ProductDetails;
