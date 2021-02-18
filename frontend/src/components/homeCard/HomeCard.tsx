import React from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Div } from '../../styles/BasicComponents.style'
import { addFood, addRandomFood, addUser } from '../../redux';
import Card from '../card';
import Button from '../button'
import Typography from '../typography';
import { FoodObject } from '../../redux/food/actions' 
import { UserObject } from '../../redux/user/actions'
import auth from '../../lib/auth'

export interface FoodReducer {
    foods: FoodObject[],
    randomFoods: FoodObject[]
  }

interface Props {
    food: FoodObject,
    user: UserObject,
}

const HomeCard = ({food, user}: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const foods: FoodObject[] | any = useSelector<{foodReducer: FoodReducer}>(state => state.foodReducer.foods);
    const newUser: UserObject  = {...user}
    const newFood: FoodObject = {...food}
    let like = false
    let dislike = false

    const voteFood = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!auth.isAuthenticated()) {
          return history.push('/login')
        }
        event.persist()
        if (event.target.innerHTML === 'Like') {
            dislike = true
            like = false

            // push food id into users likes unless its already there
            if (newUser.likes.length) {
              if (newUser.likes.indexOf(food.id) === -1) {
                newUser.likes.push(food.id);
            }
            }

            // remove food id from user dislikes
            if (newUser.dislikes) {
              for ( let a = 0; a < newUser.dislikes.length; a++){ 
                if ( newUser.dislikes[a] === food.id) { 
                    newUser.dislikes.splice(a, 1); 
                }
              }
            }

            // push user id into foods likes unless its already there
            if (newUser.likes.length) {
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
            await axios.put(`/api/consumers/edit/${auth.getUser()}/`, newUser, {
                headers: { Authorization: `Bearer ${auth.getToken()}` }
              })
            .then(res => {
                const editedUser: UserObject = {...res.data}
                dispatch(addUser(editedUser))
            })
            .catch(err => {
                console.log(err.response)
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
                console.log(err.response)
              })
        }
        if (event.target.innerHTML === 'Dislike') {
            dislike = true
            like = false

            // push food id into users dislikes unless its already there
            if (newUser.dislikes.length) {
              if (newUser.dislikes.indexOf(food.id) === -1) {
                  newUser.dislikes.push(food.id);
              }
            }

            // remove food id from user likes
            if (newUser.likes) {
              for( let c = 0; c < newUser.likes.length; c++){ 
                  if (newUser.likes[c] === food.id) { 
                      newUser.likes.splice(c, 1); 
                  }
              }
            }

            // push user id into foods dislikes unless its already there
            if (newUser.dislikes.length) {
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
            await axios.put(`/api/consumers/edit/${auth.getUser()}/`, newUser, {
                headers: { Authorization: `Bearer ${auth.getToken()}` }
              })
            .then(res => {
                const editedUser: UserObject = {...res.data}
                dispatch(addUser(editedUser))
            })
            .catch(err => {
                console.log(err.response)
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
                console.log(err.response)
              })
        }
      }
    const margin = '20px'
    if (user.likes) {
      user.likes.map((item: any) => {
        if (item === food.id) return (
          like = true,
          dislike = false
        )
      })
    }
    if (user.dislikes) {
      user.dislikes.map((item: any) => {
        if (item === food.id) return (
          like = false,
          dislike = true
        )
      })
    }
    return (
      <Card vertical={true} justifyContent='space-evenly' cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
        <img src={'//' + food.image} alt={food.name} style={{maxWidth: '150px', height: '170px', objectFit: 'contain'}} />
        <Typography variant="h4" align='center'>{food.name}</Typography>
        <Typography variant="bodySmall">{food.price}</Typography>
        <Div width='100%' height='auto' vertical={false} style={{justifyContent: 'space-evenly'}}>
          {!like && !dislike ? (
            <>
              <Button buttonSize='medium' color='primary' isFullWidth={false} handleClick={(event: React.ChangeEvent<HTMLInputElement>) => voteFood(event)}>
                Dislike
              </Button>
              <Button buttonSize='medium' color='secondary' isFullWidth={false} handleClick={(event: React.ChangeEvent<HTMLInputElement>) => voteFood(event)}>
                Like
              </Button>
            </>
          ) : null} 
          {!dislike && like ? (
          <Button buttonSize='medium' color='primary' isFullWidth={false} handleClick={(event: any) => voteFood(event)}>
            Dislike
          </Button>)
          : null}
          {dislike && !like ? (<Button buttonSize='medium' color='secondary' isFullWidth={false} handleClick={(event: any) => voteFood(event)}>
            Like
          </Button>)
          : null}
        </Div>
      </Card>
    )
  }

export default HomeCard