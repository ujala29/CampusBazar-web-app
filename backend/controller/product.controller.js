import Product from "../model/product.schema.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, originalPrice, sellingPrice, category } = req.body;

    if (!title || !description || !originalPrice || !sellingPrice || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Handle uploaded image
    let productImage = null;
    if (req.file) {
      productImage = {
        data: req.file.buffer,       // image data
        contentType: req.file.mimetype // image type like image/png
      };
    }

    const newProduct = new Product({
      title,
      description,
      originalPrice,
      sellingPrice,
      category,
      image: productImage,  // store image in DB
      seller: req.userID,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (error) {
    console.log("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const products = await Product.find({ category }).populate("seller", "name email");

    // Convert image Buffer to Base64 so frontend can display
    const productsWithImage = products.map((p) => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      originalPrice: p.originalPrice,
      sellingPrice: p.sellingPrice,
      category: p.category,
      seller: p.seller,
      image: p.image
        ? `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`
        : null,
    }));

    res.status(200).json({
      success: true,
      message: `Products in category: ${category}`,
      products: productsWithImage,
    });
  } catch (error) {
    console.log("Get Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




// ✅ Get All Products (for buyers, from all sellers)
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products, populate seller info
    const products = await Product.find().populate("seller", "name email");

    // Convert image buffer to Base64 if exists
    const productsWithImage = products.map((p) => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      originalPrice: p.originalPrice,
      sellingPrice: p.sellingPrice,
      category: p.category,
      seller: p.seller, // contains name and email
      image:
        p.image && p.image.data
          ? `data:${p.image.contentType};base64,${p.image.data.toString(
              "base64"
            )}`
          : null,
    }));

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products: productsWithImage,
    });
  } catch (error) {
    console.log("Get All Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


 export const searchProducts=async(req,res)=>{

  try {
  const { keyword } = req.query;
    if(!keyword){
      return res.status(400).json({
        success:false,
        message:"Keyword is required"
      });
    }
    const products=await Product.find({
      $or:[
        {title:{$regex:keyword,$options:"i"}},  
        {description:{$regex:keyword,$options:"i"}},
        {category:{$regex:keyword,$options:"i"}}
      ]
    }).populate("seller","name email");   
    res.status(200).json({
      success:true,
      message:`Products matching keyword: ${keyword}`,
      products
    });

  } catch (error) {
    console.log("Search Products Error:",error);
    res.status(500).json({
      success:false,
      message:"Internal server error"
    });
  }
}