import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Container } from '@mui/material';
import { ItemCardProps } from '../../Interfaces/interfaces';
import { useLocation, useNavigate } from 'react-router';
import { createItem } from '../../Services/ItemsService/itemsService';
import { logout } from '../../Services/AuthService/authService';
import { RouteStrings } from '../../Utils/RouteStrings';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const ItemDetail = () => {
    const [expanded, setExpanded] = React.useState(false);

    const location = useLocation();

    const navigate = useNavigate()

    const {thumbnailUrl, title, albumId, id, url, added} = location.state

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleAdd = () => {
        createItem({ title, url, thumbnailUrl}).then((data) => {
            console.log(data)
          }).catch((error: any) => {
            console.log(error)
          })
    }
    const handleLogout = () => {
        logout().then((response) => {
            if(response.data.status === 'ok') navigate(RouteStrings.login)
        }).catch((error) => {

        })
    }

    return (
        <Container maxWidth={'sm'}>
                    <Button size="small" onClick={handleLogout} >Logout</Button>

            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    // action={
                    //     <IconButton aria-label="settings">
                    //         <MoreVertIcon />
                    //     </IconButton>
                    // }
                    title={title.split('').slice(0, 20).join('')}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={url}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {title}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/* <IconButton aria-label="add to favorites"> */}
                    {!added && <Button size="medium" onClick={handleAdd}>Add to my cards</Button>}
                    {/* </IconButton> */}
                    {/* <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton> */}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            {title}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            {title}
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            {title}
                        </Typography>
                        <Typography>
                            {title}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Container>
    );
}

export default ItemDetail