// LikeButton.tsx
import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLikes } from "../../../context/LikesContext";
import { useUser } from "../../../context/UserContext";

interface LikeButtonProps {
  companyId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ companyId }) => {
  const { user } = useUser();
  const { likes, toggleLike } = useLikes();

  const liked = likes.some((like) => like.companyId === companyId);

  const handleLikeClick = () => {
    if (!user) {
      toast.warning("Please log in to save investments!");
      return;
    }
    if (user.userType !== "Investor") {
      toast.warning("Premmision denined!");
      return;
    }

    toggleLike(companyId, user.uid);
  };

  return (
    <button
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={handleLikeClick}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
