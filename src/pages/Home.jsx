import React, { useState, useEffect } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function fetchProductData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.log("Error occurred");
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <ClockLoader size={200} />
        </div>
      ) : posts.length > 0 ? (
        <div className="w-full flex justify-center px-6">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto gap-x-12 gap-y-6 min-h-[80vh] mb-15">
            {posts.map((post) => (
              <Product key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh]">
          <p className="text-gray-800 font-semibold text-3xl mb-3">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
