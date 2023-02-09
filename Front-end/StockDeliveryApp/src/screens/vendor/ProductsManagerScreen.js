import React  from 'react'
import ProductsForm from '../../components/ProductsForm';

export default function ProductsManagerScreen({route}) {
 let data =route.params?.data;
 

   console.log(data)


    return (
        <ProductsForm data={data}/>
    )
  }

