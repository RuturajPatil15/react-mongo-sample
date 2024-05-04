import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEditSolid } from "react-icons/lia";

export default function listItem(props) {
    return (
        <div>
            <List >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={props.Image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.Title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="grey"
                                >
                                    {props.Body}
                                </Typography>
                            </React.Fragment>
                        }
                    />
                    <IconButton edge="end" aria-label="edit" onClick={props.handleEdit} style={{color:"grey",paddingRight: "15px"}} >
                        <LiaEditSolid />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={props.Delete} style={{color:"grey"}}>
                        <AiOutlineDelete /> 
                    </IconButton>
                </ListItem>
            </List>
        </div>
    )
}
