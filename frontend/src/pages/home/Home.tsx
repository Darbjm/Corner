import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Main from '../../components/mainPage'
import { useDispatch, useSelector } from 'react-redux';
import { addFood, addRandomFood, addUser } from '../../redux';
import TextField from '../../components/textField'
import Typography from '../../components/typography';
import { Div, justify } from '../../styles/BasicComponents.style'
import { FoodObject } from '../../redux/food/actions' 
import { UserObject } from '../../redux/user/actions'
import Pagination from '../../components/pagination'
import HomeCard from '../../components/homeCard'
import auth from '../../lib/auth'
export interface FoodReducer {
  foods: FoodObject[],
  randomFoods: FoodObject[]
}

export interface UserReducer {
  user: UserObject
}

const Home = () => {
  const dispatch = useDispatch();
  const foods: FoodObject[] | any = useSelector<{foodReducer: FoodReducer}>(state => state.foodReducer.foods);
  const user: UserObject | any = useSelector<{userReducer: UserReducer}>(state => state.userReducer.user);
  const [foundItems, setFoundItems] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isItemsFound, setIsItemsFound] = useState(true)
  const [foodsPerPage, setFoodsPerPage] = useState(20);
  const [searchError, setErrorMessage] = useState({});
  const [search, setSearch] = useState('')

  const getData = async () => {
    await axios.get('/api/foods/all', {
      headers: { Authorization: '' }
    })
    .then(response => {
      dispatch(addFood(response.data));
      dispatch(addRandomFood(response.data))
    })
    .catch(error => {
      console.error(error.response);
    });
    if (auth.getUser()) {
      await axios.get(`/api/consumers/show/${auth.getUser()}`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
      .then(response => {
        console.log(response.data)
        dispatch(addUser(response.data))
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (elName: string, value: string | undefined) => {
    if (value) {
      setSearch(value)
      const results: FoodObject[] = foods.filter((food: FoodObject) => {
        if (food.name.toLowerCase().includes(value.toLowerCase())) return food
      })
      setIsItemsFound(true)
      if (results.length === 0) {
        setIsItemsFound(false)
      }
      return setFoundItems(results)
    }
    return setSearch('')
  };

  const searchedItems = () => {
    if (foundItems.length > 0) {
      return foundItems.map((food: FoodObject) => (
        <HomeCard key={food.name} food={food} user={user}/>
        )) 
    }
    return (
      <Typography variant='h1'>No items found</Typography>
    )
  }

  // get current foods
  const indexOfLastFoods = currentPage * foodsPerPage;
  const indexOfFirstFoods = indexOfLastFoods - foodsPerPage;
  const currentFoods= foods.slice(indexOfFirstFoods, indexOfLastFoods)

  const displayPagination = (height: string, justify: justify) => {
    if (isItemsFound) return (
      <Div vertical={true} width='100%' height={height} justifyContent={justify}>
        <Pagination foodsPerPage={foodsPerPage} totalFoods={foods.length} setCurrentPage={setCurrentPage} pageNumber={currentPage} setSearch={setSearch}/>
      </Div>)
    return (<> </>)
  }


  return user ? (
    <Main direction='col'>
      <Div vertical={false} width='100%' height='100%'>
        <Div vertical={true} width='100%' height='350px'>
          <TextField elName='search' size='large' onChange={handleChange} color='primary' placeholder='🔎 search' error={searchError}/>
          {displayPagination('100px', 'flex-end')}
        </Div>
        {search ? 
          searchedItems()
          : 
          currentFoods.map((food: FoodObject) => (
            <HomeCard key={food.name} food={food} user={user} />
          ))}
      </Div>
      {displayPagination('100px', 'center')}
    </Main>
  ) : (
  <Main>
    <Typography variant='h1'>Loading...</Typography>
  </Main>
  )
};

export default Home;