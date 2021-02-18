import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Main from '../../components/mainPage'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux';
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
  const user: UserObject | any = useSelector<{userReducer: UserReducer}>(state => state.userReducer.user);
  const [foundLikedItems, setFoundLikedItems] = useState<any[]>([])
  const [likesCurrentPage, setLikesCurrentPage] = useState(1);
  const [dislikesCurrentPage, setDislikesCurrentPage] = useState(1);
  const [isLikedItemsFound, setIsLikedItemsFound] = useState(true)
  const [isDislikedItemsFound, setIsDislikedItemsFound] = useState(true)
  const [foundDislikedItems, setFoundDislikedItems] = useState<any[]>([])
  const [foodsPerPage, setFoodsPerPage] = useState(10);
  const [editError, setErrorEditMessage] = useState<string[]>([]);
  const [search, setSearch] = useState('')
  const [success, setSuccess] = useState(false)
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
      return setSuccess(true)
    })
    .catch(err => {
      console.log(err.response)
      return setErrorEditMessage(Object.values(err.response.data))
    })
  };

  const handleChangeForm = (name: string, value: string | undefined): void => {
    setErrorMessage({})
    setSuccess(false)
    return setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  useEffect(() => {
    const getData = async () => {
      await axios.get(`/api/consumers/edit/${auth.getUser()}/`, {
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
        setDislikes(data.dislikes)
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
      const likedResults: FoodObject[] = likes.filter((food: FoodObject) => {
        if (food.name.toLowerCase().includes(value.toLowerCase())) return food
      })

      setIsLikedItemsFound(true)
      if (likedResults.length === 0) {
        setIsLikedItemsFound(false)
      }
      setFoundLikedItems(likedResults)

      const dislikedResults: FoodObject[] = dislikes.filter((food: FoodObject) => {
        if (food.name.toLowerCase().includes(value.toLowerCase())) return food
      })

      setIsDislikedItemsFound(true)
      if (dislikedResults.length === 0) {
        setIsDislikedItemsFound(false)
      }
      return setFoundDislikedItems(dislikedResults)
    }
    return setSearch('')
  };

  const searchedItems = () => {
    return (
      <Div width='100%' height='auto' vertical={false} paddingTop='60px'>
        <Typography variant='h2' color='primary'>Likes:</Typography>
        <Div width='100%' height='auto' vertical={false}>
          {isLikedItemsFound ?
            foundLikedItems.map((food: FoodObject) => (
              <HomeCard key={food.name} food={food} user={user} />
            ))
            : 
            <Div width='100%' height='100px' vertical={true}>
              <Typography variant='h4' color='primary'>No likes found</Typography> 
            </Div>
          }
        </Div>
        <Div width='100%' height='auto' vertical={false} paddingTop='60px'>
          <Typography variant='h2' color='secondary'>Dislikes:</Typography>
          <Div width='100%' height='auto' vertical={false}>
          {isDislikedItemsFound ?
            foundDislikedItems.map((food: FoodObject) => (
              <HomeCard key={food.name} food={food} user={user} />
            ))
            : 
            <Div width='100%' height='100px' vertical={true}>
              <Typography variant='h4' color='secondary'>No dislikes found</Typography> 
            </Div>
          }
          </Div>
        </Div>
      </Div>
    )
  }

  // get current liked foods
  const indexOfLikedLastFoods = likesCurrentPage * foodsPerPage;
  const indexOfLikedFirstFoods = indexOfLikedLastFoods - foodsPerPage;
  const likesCurrentFoods = likes.slice(indexOfLikedFirstFoods, indexOfLikedLastFoods)

  // get current disliked foods
  const indexOfDislikedLastFoods = dislikesCurrentPage * foodsPerPage;
  const indexOfDislikedFirstFoods = indexOfDislikedLastFoods - foodsPerPage;
  const dislikesCurrentFoods = dislikes.slice(indexOfDislikedFirstFoods, indexOfDislikedLastFoods)

  const displayLikesPagination = (height: string, justify: justify) => {
    if (likes) return (
      <Div vertical={true} width='100%' height={height} justifyContent={justify}>
        <Pagination foodsPerPage={foodsPerPage} totalFoods={likes.length} setCurrentPage={setLikesCurrentPage} pageNumber={likesCurrentPage} setSearch={setSearch}/>
      </Div>)
    return (<> </>)
  }

  const displayDislikesPagination = (height: string, justify: justify) => {
    if (likes) return (
      <Div vertical={true} width='100%' height={height} justifyContent={justify}>
        <Pagination foodsPerPage={foodsPerPage} totalFoods={dislikes.length} setCurrentPage={setDislikesCurrentPage} pageNumber={dislikesCurrentPage} setSearch={setSearch}/>
      </Div>)
    return (<> </>)
  }


  const showLikesDislikes = () => {
    return (
      <Div width='100%' height='auto' vertical={false} paddingTop='60px'>
        <Typography variant='h2' color='primary'>Likes:</Typography>
        <Div width='100%' height='auto' vertical={false}>
          {displayLikesPagination('40px', 'flex-end')}
          {
            likesCurrentFoods.map((food: FoodObject) => (
              <HomeCard key={food.name} food={food} user={user} />
            ))
          }
        </Div>
        <Div width='100%' height='auto' vertical={false} paddingTop='60px'>
          <Typography variant='h2' color='secondary'>Dislikes:</Typography>
          <Div width='100%' height='auto' vertical={false}>
            {displayDislikesPagination('40px', 'flex-end')}
            {
              dislikesCurrentFoods.map((food: FoodObject) => (
                <HomeCard key={food.name} food={food} user={user} />
              ))
            }
          </Div>
        </Div>
      </Div>
    )
  }


  return user ? (
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
                {success ? <Typography variant='h4' color='secondary'>Success!</Typography> : <></>}
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
        {search ? 
          searchedItems()
          : 
          showLikesDislikes()}
      </Div>
    </Main>
  ) : (
  <Main>
    <Typography variant='h1'>Loading...</Typography>
  </Main>
  )
};

export default Home;