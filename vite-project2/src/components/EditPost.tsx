import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/postSlice';
import { Post } from '../../types/Post';
import { AppDispatch } from '../../redux/store';
interface EditPostProps {
  post: Post;
  onCancel: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ post, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    dispatch(updatePost({ ...post, title, content }));
    onCancel();
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Kaydet</button>
      <button onClick={onCancel}>İptal</button>
    </div>
  );
};

export default EditPost;