import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Main from '../../components/mainPage'
import { useDispatch, useSelector } from 'react-redux';
import { addFood, addRandomFood, addUser } from '../../redux';
import TextField from '../../components/textField'
import Form from '../../components/form'
import Card from '../../components/card'
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
  const [foundItems, setFoundItems] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [isItemsFound, setIsItemsFound] = useState(true)
  const [foodsPerPage, setFoodsPerPage] = useState(20);
  const [editError, setErrorEditMessage] = useState<string[]>([]);
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState({})
  const [errorMessage, setErrorMessage] = useState({});
  const [likes, setLikes] = useState<FoodObject[]>([])
  const [dislikes, setDislikes] = useState<FoodObject[]>([])
  const [details, setDetails] = useState({
    username: '',
    ['area_code']: '',
    password: '',
    ['password_confirmation']: ''
  });

  const handleSubmit = async () => {
    const newDetails: any = {...details}
    if (!details.username) return setErrorMessage({username: 'Cannont be blank'})
    if (!details.area_code) return setErrorMessage({area_code: 'Cannont be blank'})
    if (!details.password) {
      delete newDetails.password
      delete newDetails.password_confirmation
    }
    if (newDetails.password !== newDetails.password_confirmation) return setErrorMessage({
      password: 'Must match', 
      password_confirmation: 'Must match'
    })
    axios.put(`/api/consumers/edit/${auth.getUser()}/`, newDetails, {
      headers: { Authorization: `Bearer ${auth.getToken()}` }})
    .then(res => {
      dispatch(addUser(res.data))
    })
    .catch(err => {
      console.log(err.response)
      setErrorEditMessage(Object.values(err.response.data))
    })
  };

  const handleChangeForm = (name: string, value: string | undefined): void => {
    setErrorMessage({})
    setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  useEffect(() => {
    const getData = async () => {
      await axios.get(`/api/consumers/show/${auth.getUser()}/`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
      .then(response => {
        const { data } = response
        setDetails({
          username: data.username,
          ['area_code']: data.area_code,
          password: '',
          ['password_confirmation']: ''
        })
        setLikes(data.likes)
        setDislikes(data.likes)
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

  const searchedLikedItems = () => {
    if (likes.length > 0) {
      return likes.map((food: FoodObject) => (
        <HomeCard key={food.name} food={food} user={user}/>
        )) 
    }
    return (
      <Typography variant='h1'>No items found</Typography>
    )
  }

  const searchedDislikedItems = () => {
    if (likes.length > 0) {
      return likes.map((food: FoodObject) => (
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


  return user && likes && dislikes ? (
    <Main direction='col'>
      <Div vertical={false} width='100%' height='100%'>
        <Div vertical={true} width='100%' height='500px'>
            <Card cardWidth='40%' cardHeight='70%' justifyContent='center'>
                <Form title='Edit Info' buttonName='Submit' buttonColor='primary' handleSubmit={() => handleSubmit()}>
                    <TextField value={details.username} error={errorMessage} placeholder='Username' elName='username' color='primary' onChange={handleChangeForm} />
                    <TextField value={details.area_code} error={errorMessage} placeholder='Area code' elName='area_code'color='primary' onChange={handleChangeForm} />
                    <TextField error={errorMessage} placeholder='Password' elName='password'type='password' color='primary' onChange={handleChangeForm} />
                    <TextField error={errorMessage} placeholder='Password confirmation' elName='password_confirmation' type='password' color='primary' onChange={handleChangeForm} />
                </Form>
            </Card>
            <Div vertical={true} width='100%' height='auto'>
            {editError && editError.map((message: string) => (
              <div key={message}>
                <br/>
                <Typography variant='h4' color='primary'>{message}</Typography>
                <br/>
              </div>
            ))}
            </Div>
        </Div>
        <TextField elName='search' size='large' onChange={handleChange} color='primary' placeholder='🔎 search' error={searchError}/>
          {displayPagination('100px', 'flex-end')}
        {search ? 
          searchedLikedItems()
          : (
          likes.map((food: FoodObject) => (
            <HomeCard key={food.name} food={food} user={user} />
          ))
          // dislikes.map((food: FoodObject) => (
          //   <HomeCard key={food.name} food={food} user={user} />
          // ))
          )}
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