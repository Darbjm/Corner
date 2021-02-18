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
    getData?: () => void 
}

const HomeCard = ({food, user, getData}: Props) => {
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
            if (newUser.likes.indexOf(food.id) === -1) {
                newUser.likes.push(food.id);
            }

            // remove food id from user dislikes
            for( var i = 0; i < newUser.dislikes.length; i++){ 
                if ( newUser.dislikes[i] === food.id) { 
                    newUser.dislikes.splice(i, 1); 
                }
            }

            // push user id into foods likes unless its already there
            if (newFood.likes.indexOf(user.id) === -1) {
                newFood.likes.push(user.id)
            }

            // remove user id from food dislikes
            for( var i = 0; i < newFood.dislikes.length; i++){ 
                if ( newFood.dislikes[i] === user.id) { 
                    newFood.dislikes.splice(i, 1); 
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
                const foundIndex = newFoods.findIndex(food => food.id == res.data.id);
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
            if (newUser.dislikes.indexOf(food.id) === -1) {
                newUser.dislikes.push(food.id);
            }

            // remove food id from user likes
            for( var i = 0; i < newUser.likes.length; i++){ 
                if (newUser.likes[i] === food.id) { 
                    newUser.likes.splice(i, 1); 
                }
            }

            // push user id into foods dislikes unless its already there
            if (newFood.dislikes.indexOf(user.id) === -1) {
                newFood.dislikes.push(user.id)
            }

            // remove user id from food likes
            for( var i = 0; i < newFood.likes.length; i++){ 
                if ( newFood.likes[i] === user.id) { 
                    newFood.likes.splice(i, 1); 
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
                const foundIndex = newFoods.findIndex(food => food.id == res.data.id);
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
    {user.likes.map((item: any) => {
      if (item === food.id) return (
        like = true,
        dislike = false
      )
    })}
    {user.dislikes.map((item: any) => {
      if (item === food.id) return (
        like = false,
        dislike = true
      )
    })}
    return (
      <Card vertical={true} justifyContent='space-evenly' cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
        <img src={'//' + food.image} style={{maxWidth: '150px', height: '170px', objectFit: 'contain'}} />
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