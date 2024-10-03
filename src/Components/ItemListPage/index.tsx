import { Button, Container, Grid2 } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { getPhotos } from '../../Services/ApiService/apiService';
import { ItemCardProps } from '../../Interfaces/interfaces';
import ItemCard from '../UI/Card';
import SearchBar from '../UI/SearchBar';
import { getItems } from '../../Services/ItemsService/itemsService';
import { logout } from '../../Services/AuthService/authService';
import { RouteStrings } from '../../Utils/RouteStrings';
import { useNavigate } from 'react-router';

const ItemList = () => {
  
   const [itemsfromApi, setitemsfromApi] = useState<Array<ItemCardProps>>([]);
   
   const [savedItems, setSavedItems] = useState<Array<ItemCardProps>>([]);

   const [itemsPage, setitemsPage] = useState(0);

   const navigate = useNavigate()


   let itemsWithPagination = useMemo(() => {
      return itemsfromApi
   }, [itemsPage, itemsfromApi]);

   const [filteredItems, setFilteredItems] = useState<Array<ItemCardProps>>(itemsWithPagination); 

   const loadItems = async () => {
    const responses = await Promise.all([getPhotos(itemsPage*5, 5), getItems()]);
    responses.map((response: any, index: number) => {
       index === 0 ?  setitemsfromApi(response.data) : setSavedItems(response.data)
        // setitemsfromApi(request)
    })
   }

   const updateSaved = async () => {
    getItems().then((data) => {
        setSavedItems(data.data)
    })
   }

   useEffect(() => {
    loadItems();
   }, [])

   const handleLogout = () => {
    logout().then((response) => {
        if(response.data.status === 'ok') navigate(RouteStrings.login)
    }).catch((error) => {

    })
}
    
  return (
    <Container maxWidth='lg'>
        {/* <SearchBar callBackFunction={() => {}} /> */}
        <Button size="small" onClick={handleLogout} >Logout</Button>
        <Grid2 spacing={4} container>
            <Grid2 size={{xs : 12, md: 6}}>
                <h4>Saved Items</h4>
                <Grid2 container spacing={2}>
                    {savedItems.length> 0 && savedItems.map((item: ItemCardProps, index: number) => {
                       return  <Grid2 size={{xs : 12, md: 4}} >
                            <ItemCard {...item} added={true} />
                        </Grid2>
                        
                    })}
                </Grid2>
            </Grid2 >
            <Grid2 size={{xs : 12, md: 6}}>
               <h4>Items from Api</h4>
                <Grid2 container spacing={2}>
                    {itemsWithPagination.length> 0 && itemsWithPagination.map((item: ItemCardProps, index: number) => {
                       return  <Grid2 size={{xs : 12, md: 4}} >
                            <ItemCard {...item} added={false} callbackFn={updateSaved} />
                        </Grid2>
                        
                    })}
                </Grid2>
            </Grid2>
        </Grid2>
    </Container>
  )
}

export default ItemList
