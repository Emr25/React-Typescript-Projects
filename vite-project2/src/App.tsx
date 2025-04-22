import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AddPost from './components/AddPost';
import PostList from './components/PostList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Blog Uygulaması</h1>
        <AddPost />
        <PostList />
      </div>
    </Provider>
  );
};

export default App;