import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { addFood, addRandomFood } from '../../redux';
import TextField from '../../components/textField'
import Typography from '../../components/typography';
import { Div, Main } from '../../styles/BasicComponents.style'
import { FoodObject } from '../../redux/food/actions' 
import Pagination from '../../components/pagination'


const Home = () => {
  const dispatch = useDispatch();
  const foods: FoodObject[] | any = useSelector<{foods: any}>(state => state.foods);
  const [foundItems, setFoundItems] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isItemsFound, setIsItemsFound] = useState(true)
  const [foodsPerPage, setFoodsPerPage] = useState(20);
  const [searchError, setErrorMessage] = useState({});
  const [search, setSearch] = useState('')


  useEffect(() => {
    const getData = async () => {
      await axios.get('api/foods/all')
      .then(response => {
        dispatch(addFood(response.data));
        dispatch(addRandomFood(response.data))
      })
      .catch(error => {
        console.error(error);
      });
    }
    getData();
  }, []);

  const handleChange = (elName: string, value: string | undefined) => {
    if (value) {
      setSearch(value)
      const results: any = foods.filter((food: FoodObject) => {
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
        <Card key={food.name} justifyContent='space-evenly' cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
          <img src={'//' + food.image} style={{maxWidth: '150px', height: '170px', objectFit: 'contain'}} />
          <Typography variant="h4" align='center'>{food.name}</Typography>
          <Typography variant="bodySmall">{food.price}</Typography>
        </Card>)) 
    }
    return (
      <Typography variant='h1'>No items found</Typography>
    )
  }

  const displayPagination = (height: string) => {
    if (isItemsFound) return (
      <Div vertical={true} width='100%' height={height}>
        <Pagination foodsPerPage={foodsPerPage} totalFoods={foods.length} setCurrentPage={setCurrentPage} pageNumber={currentPage} setSearch={setSearch}/>
      </Div>)
    return null
  }

  // get current foods
  const indexOfLastFoods = currentPage * foodsPerPage;
  const indexOfFirstFoods = indexOfLastFoods - foodsPerPage;
  const currentFoods= foods.slice(indexOfFirstFoods, indexOfLastFoods)

  const margin = '20px'

  return foods ? (
    <Main>
      <Div vertical={false} width='100%' height='100%'>
        <Div vertical={true} width='100%' height='400px'>
          <Div vertical={true} width='100%' height='60%' justifyContent='flex-end'>
            <TextField elName='search' size='large' onChange={handleChange} color='primary' placeholder='🔎 search' error={searchError}/>
          </Div>
          {displayPagination('40%')}
        </Div>
        {search ? 
          searchedItems()
          : 
          currentFoods.map((food: FoodObject) => (
          <Card key={food.name} justifyContent='space-evenly' cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
            <img src={'//' + food.image} style={{maxWidth: '150px', height: '170px', objectFit: 'contain'}} />
            <Typography variant="h4" align='center'>{food.name}</Typography>
            <Typography variant="bodySmall">{food.price}</Typography>
          </Card>))}
      </Div>
      {displayPagination('100px')}
    </Main>
  ) : (
  <Main>
    <Typography variant='h1'>Loading...</Typography>
  </Main>
  )
};

export default Home;