import classes from './PostList.module.css';
import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";
import Modal from "./Modal.jsx";
import {useEffect, useState} from "react";
function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);
  const [ isFetching, setIsFetching ] = useState(false);
  
  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const response = await fetch('http://localhost:8080/posts')
      const responseData = await response.json();
      setPosts(responseData.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []);
  
  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }
  
  let modalContent;
  if (isPosting) {
    modalContent = <Modal onClose={onStopPosting}>
      <NewPost onCancel={onStopPosting} onAddPost={addPostHandler}></NewPost>
    </Modal>
  }
  
  return (
    <>
      {modalContent}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => <Post key={post.body} author={post.author} body={post.body}/>)}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{textAlign: 'center', color: 'white' }}>
          <h2>There are no posts yet. </h2>
          <p>Start adding some! </p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading posts...</p>
        </div>
      )}
    </>
  );
}

export default PostList;