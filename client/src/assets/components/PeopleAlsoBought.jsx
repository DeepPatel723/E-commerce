import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import axiosInsatnce from "../lib/axios";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axiosInsatnce.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred while fetching recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
   <div className='recommendation-sec'>
      <div className="sec-title">People Also Bought</div>
      <div className="sec-pdp">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default PeopleAlsoBought;
