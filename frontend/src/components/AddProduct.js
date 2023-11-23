import React from "react"
const AddProduct = ()=>{
   
     const [name, setProductName] = React.useState("")
     const [price, setProductPrice] = React.useState("")
     const [category, setProductCategory] = React.useState("")
     const [company, setProductCompany] = React.useState("")
     const [error, setError] = React.useState(false)
     const handleProduct = async()=>{
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductCompany("");
        if (!name || !price || !category || !company) {

            setError(true);
            return false
            
        }
        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        // console.warn(userId._id)
        let result = await fetch("http://localhost:4000/addProduct",{
            method:"post",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
            }
        });
        result = await result.json();
        console.warn("Result console: ",result)
     
    }
    


    return(
        <div className="product">
            <h1>Add Product</h1>
            <form className="form" method="post" name="addproduct" >
                <input className="inputBox" type="text" name="product"  placeholder="Enter Product Name" value={name} onChange={(e)=>setProductName(e.target.value)}/>
                {error &&  !name && <span className="invalid-input">Enter a valid name</span>}
                <input className="inputBox" type="text" name="price" placeholder="Enter Product Price" value={price} onChange={(e)=>setProductPrice(e.target.value)}/>
                {error &&  !price && <span className="invalid-input">Enter a valid price</span>}
                <input className="inputBox" type="text" name="category" placeholder="Enter Product Category" value={category} onChange={(e)=>setProductCategory(e.target.value)}/>
                {error &&  !category && <span className="invalid-input">Enter a valid category</span>}
                <input className="inputBox" type="text" name="rrry" placeholder="Enter Product Company" value={company} onChange={(e)=>setProductCompany(e.target.value)}/>
                {error &&  !company && <span className="invalid-input">Enter a valid company</span>}
                <button className="inputButton" type="button" onClick={handleProduct}>Add Product</button>
            </form>
        </div>
    )
};
export default AddProduct;