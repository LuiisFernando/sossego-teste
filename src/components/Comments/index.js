import React from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';

export default function Comment({ open, comment}) {
    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {comment && comment.map(comment => (
                <ListItem button key={comment.id}>
                  <ListItemText primary={comment.email} secondaryTypographyProps={{ component: 'div' }} secondary={
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 'bold' }}>{comment.name}</span>
                            <span>{comment.body}</span>
                        </div>
                  } />
                </ListItem>
              ))}
            </List>
        </Collapse>
    );
}