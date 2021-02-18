import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import Card from '../../components/card';
import Typography from '../../components/typography';
import Button from '../../components/button';
import { Div } from '../../styles/BasicComponents.style'
import auth from '../../lib/auth'
import { FoodObject } from '../../redux/food/actions' 
import Main from '../../components/mainPage'
import { removeRandomFood } from '../../redux';
import { FoodReducer } from '../home/Home'
import { addFood, addRandomFood, addUser } from '../../redux';
import { UserObject } from '../../redux/user/actions'

interface UserReducer {
  user: UserObject
}

const Swipe = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const foods: FoodObject[] | any = useSelector<{foodReducer: FoodReducer}>(state => state.foodReducer.foods);
  const food: FoodObject[] | any = useSelector<{foodReducer: FoodReducer}>(state => state.foodReducer.randomFoods[0]);
  const user: UserObject | any = useSelector<{userReducer: UserReducer}>(state => state.userReducer.user)
  const newUser: UserObject  = {...user}
  const newFood: FoodObject = {...food}

  useEffect(() => {
    const findUnseenFood = async () => {
      if (user.likes) {
        user.likes.map((number: number) => {
        if (number === food.id) return (
          dispatch(removeRandomFood(food))
        )
        })
      }
      if (user.dislikes) {
        user.dislikes.map((number: number) => {
          if (number === food.id) return (
            dispatch(removeRandomFood(food))
          )
        })
      }
    }
    findUnseenFood();
  }, []);


  const voteFood = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!auth.isAuthenticated()) {
        return history.push('/login')
      }
      event.persist()
      if (event.target.innerHTML === 'Like') {

          // push food id into users likes unless its already there
          if (newUser.likes) {
            if (newUser.likes.indexOf(food.id) === -1) {
                newUser.likes.push(food.id);
            }
          }

          // remove food id from user dislikes
          if (newUser.dislikes) {
            for( let a = 0; a < newUser.dislikes.length; a++){ 
              if ( newUser.dislikes[a] === food.id) { 
                  newUser.dislikes.splice(a, 1); 
              }
            }
          }

          // push user id into foods likes unless its already there
          if (newUser.likes) {
            if (newFood.likes.indexOf(user.id) === -1) {
                newFood.likes.push(user.id)
            }
          }

          // remove user id from food dislikes
          if (newUser.dislikes) {
            for( let b = 0; b < newFood.dislikes.length; b++){ 
                if ( newFood.dislikes[b] === user.id) { 
                    newFood.dislikes.splice(b, 1); 
                }
            }
          }
          // edit new user in database
          await axios.put(`/api/consumers/like/${auth.getUser()}/`, newUser, {
              headers: { Authorization: `Bearer ${auth.getToken()}` }
            })
          .then(res => {
              const editedUser: UserObject = {...res.data}
              dispatch(addUser(editedUser))
          })
          .catch(err => {
              console.log(err)
            })

          // edit newfood in database
          await axios.put(`/api/foods/likedislike/${food.id}/`, newFood, {
              headers: { Authorization: `Bearer ${auth.getToken()}` }
            })
          .then(res => {
              const newFoods: FoodObject[] = [...foods]
              const foundIndex = newFoods.findIndex(food => food.id === res.data.id);
              newFoods[foundIndex] = res.data;
              dispatch(addFood(newFoods))
              dispatch(addRandomFood(newFoods))
          })
          .catch(err => {
              console.log(err)
            })
      }
      if (event.target.innerHTML === 'Dislike') {

          // push food id into users dislikes unless its already there
          if (newUser.dislikes) {
            if (newUser.dislikes.indexOf(food.id) === -1) {
                newUser.dislikes.push(food.id);
            }
          }

          // remove food id from user likes
          if (newUser.likes) {
            for( let c = 0; c < newUser.likes.length; c++){ 
                if ( newUser.likes[c] === food.id) { 
                    newUser.likes.splice(c, 1); 
                }
            }
          }

          // push user id into foods dislikes unless its already there
          if (newUser.dislikes) {
            if (newFood.dislikes.indexOf(user.id) === -1) {
                newFood.dislikes.push(user.id)
            }
          }

          // remove user id from food likes
          if (newUser.likes) {
            for( let i = 0; i < newFood.likes.length; i++){ 
                if ( newFood.likes[i] === user.id) { 
                    newFood.likes.splice(i, 1); 
                }
            }
          }
          
          // edit new user in database
          await axios.put(`/api/consumers/like/${auth.getUser()}/`, newUser, {
              headers: { Authorization: `Bearer ${auth.getToken()}` }
            })
          .then(res => {
              const editedUser: UserObject = {...res.data}
              dispatch(addUser(editedUser))
          })
          .catch(err => {
              console.log(err)
            })

          // edit newfood in database
          await axios.put(`/api/foods/likedislike/${food.id}/`, newFood, {
              headers: { Authorization: `Bearer ${auth.getToken()}` }
            })
          .then(res => {
              const newFoods: FoodObject[] = [...foods]
              const foundIndex = newFoods.findIndex(food => food.id === res.data.id);
              newFoods[foundIndex] = res.data;
              dispatch(addFood(newFoods))
              dispatch(addRandomFood(newFoods))
          })
          .catch(err => {
              console.log(err)
            })
      }
    }
  return food ? (
    <Main>
      <Card vertical={true} justifyContent='space-evenly' cardWidth='40%' cardHeight='450px'>
        <img src={'//' + food.image} alt={food.name} style={{maxWidth: '300px', height: '300px', objectFit: 'contain'}} />
        <Typography variant="h4" align='center'>{food.name}</Typography>
        <Typography variant="bodySmall">{food.price}</Typography>
        <Div width='100%' height='auto' vertical={false} style={{justifyContent: 'space-evenly'}}>
        <Button buttonSize='medium' color='primary' isFullWidth={false} handleClick={(event: React.ChangeEvent<HTMLInputElement>) => voteFood(event)}>
          Dislike
        </Button>
        <Button buttonSize='medium' color='secondary' isFullWidth={false} handleClick={(event: React.ChangeEvent<HTMLInputElement>) => voteFood(event)}>
          Like
        </Button>
        </Div>
      </Card>
    </Main>
  ) : (
  <Main>
    <Typography variant='h1'>Out of Snacks!</Typography>
  </Main>
  )
}

export default Swipe;
