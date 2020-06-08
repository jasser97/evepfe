import React from "react";
import NavApp from "../nav-app/NavApp";

const Blog = (props) => {
  return (
    <div>
      <NavApp navBlog={props.location.pathname} />
      Blog
    </div>
  );
};

export default Blog;
