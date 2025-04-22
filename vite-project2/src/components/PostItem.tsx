import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/postSlice';
import { Post } from '../../types/Post';
import { AppDispatch } from '../../redux/store';
import EditPost from './EditPost';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  return (
    <li>
      {isEditing ? (
        <EditPost post={post} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Yazar:</strong> {post.author}</p>
          <button onClick={() => setIsEditing(true)}>Düzenle</button>
          <button onClick={handleDelete}>Sil</button>
        </div>
      )}
    </li>
  );
};

export default PostItem;