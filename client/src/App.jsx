import PostList from "./components/PostList.jsx";
import MainHeader from "./components/MainHeader.jsx";
import {useState} from "react";


function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function showModalHandler() {
    setModalIsVisible(true);
  }
  
  function hideModalHandler() {
    setModalIsVisible(false);
  }
  
  return (
    <>
      <MainHeader onCreatePost={showModalHandler}></MainHeader>
      <main>
        <PostList isPosting={modalIsVisible} onStopPosting={hideModalHandler}></PostList>
      </main>;
    </>
  );
}

export default App;
