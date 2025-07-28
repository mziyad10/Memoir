import React from "react";
import ImageKitWrapper from "./Image";
import {format} from "timeago.js";
import { Link } from "react-router-dom";

const PostListItem = (post) => {
  console.log(post.post,"post details");
  
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {post.img && <div className="md:hidden xl:block xl:w-1/3">
        <ImageKitWrapper
          src={post.post.img}
          className="rounded-2xl object-cover"
          w="735"
        />
      </div>}

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
         {post.post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">{post.post.user.username}</Link>
          <span>On</span>
          <Link className="text-blue-800">{post.post.category}</Link>
          <span>{format(post.post.createdAt)}</span>
        </div>
        <p>
          {post.post.desc}
        </p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">
          Read More..
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
