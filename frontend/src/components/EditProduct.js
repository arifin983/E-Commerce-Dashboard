import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
const EditProduct = ()=>{
   
     const [name, setProductName] = React.useState("")
     const [price, setProductPrice] = React.useState("")
     const [category, setProductCategory] = React.useState("")
     const [company, setProductCompany] = React.useState("")
     const params = useParams();
     const navigate = useNavigate()
     useEffect(()=>{
        getProductDetails();
     },[])
     const getProductDetails = async ()=>{
        console.log("params>>>>>",params)
        let result = await fetch(`http://localhost:4000/editProduct/${params.id}`,{
            headers: {
              authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
          })
        result = await result.json()
        setProductName(result.name)
        setProductPrice(result.price)
        setProductCategory(result.category)
        setProductCompany(result.company) 

     }
     const handleProductEdit = async()=>{
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductCompany("");
        console.log(name,price,category,company)
        let result = await fetch(`http://localhost:4000/updateProduct/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        })
        result = await result.json()
        console.warn(result)
        navigate("/")
     
    }
    


    return(
        <div className="product">
            <h1>Edit Product</h1>
            <form className="form" method="post" name="addproduct" >
                <input className="inputBox" type="text" name="product"  placeholder="Enter Product Name" value={name} onChange={(e)=>setProductName(e.target.value)}/>
                <input className="inputBox" type="text" name="price" placeholder="Enter Product Price" value={price} onChange={(e)=>setProductPrice(e.target.value)}/>
                <input className="inputBox" type="text" name="category" placeholder="Enter Product Category" value={category} onChange={(e)=>setProductCategory(e.target.value)}/>
                <input className="inputBox" type="text" name="rrry" placeholder="Enter Product Company" value={company} onChange={(e)=>setProductCompany(e.target.value)}/>
                <button className="inputButton" type="button" onClick={handleProductEdit}>Edit Product</button>
            </form>
        </div>
    )
};
export default EditProduct;