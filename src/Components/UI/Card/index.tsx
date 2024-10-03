import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ItemCardProps } from '../../../Interfaces/interfaces';
import { useNavigate } from 'react-router';
import { RouteStrings } from '../../../Utils/RouteStrings';
import { createItem } from '../../../Services/ItemsService/itemsService';

export default function ItemCard({ thumbnailUrl, title, albumId, id, url, added, callbackFn} : ItemCardProps) {

    const navigator = useNavigate()

  const handleDetail = () => {
    navigator(RouteStrings.itemDetail, {
        state : {thumbnailUrl, title, albumId, id, url, added} 
    })
  } 

  const handleCardClick = async () => {
    createItem({ title, url, thumbnailUrl}).then((data) => {
      console.log(data)
      if(callbackFn)  callbackFn()
    }).catch((error: any) => {
      console.log(error)
    })
  }
    
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={thumbnailUrl}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title.split('').slice(0,20).join('')}
        </Typography>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        {!added && <Button size="small" onClick={handleCardClick} >Add to my cards</Button>}
        <Button size="small" onClick={handleDetail}>Card Detail</Button>
      </CardActions>
    </Card>
  );
}