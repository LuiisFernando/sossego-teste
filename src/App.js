import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import api from './services/api';

import Comments from './components/Comments';

function App() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const response = await api.get('posts');

    const post = response.data.map(post => {
      return {
        ...post,
        open: false
      };
    })

    setPosts(post);
  }

  async function handleOpenPost(_post) {
    debugger
    let existComment = _post.comment;

    if (!existComment) {
      const response = await api.get(`/posts/${_post.id}/comments`);
      console.log(response);
      existComment = response.data;
    }

    setPosts(posts.map(post => {
      return {
        ...post,
        open: post.id === _post.id ? !_post.open : _post.open,
        comment: post.id === _post.id ? existComment : null
      }
    }));

  }

  function handleClosePost(_post) {
    setPosts(posts.map(post => {
      return {
        ...post,
        open: false
      }
    }));
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <Container>
      <h1>Posts</h1>

      {posts.map(post => (
        <List key={post.id}>
          <ListItem style={{ background: post.open ? 'rgba(0, 0, 0, 0.1)' : 'white' }} button onClick={() => !post.open ? handleOpenPost(post) : handleClosePost(post)}>
            <ListItemText primary={post.title} secondary={post.body} />
            {post.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Comments open={post.open} comment={post.comment} />
        </List>
      ))}
    </Container>
  );
}

export default App;
