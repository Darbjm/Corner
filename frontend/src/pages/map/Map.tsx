import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import axios from 'axios';

import Main from '../../components/mainPage'
import { Div } from '../../styles/BasicComponents.style'
import Card from '../../components/card'
import Typography from '../../components/typography'


interface PopulatedFoodObject {
    id: number;
    name: string;
    price: string;
    likes: any[];
    dislikes: any[];
    creator: null;
    description: null | string;
    image: string;
  }

interface AreaCode {
    postcode: string,
    long: number,
    lat: number
}
interface viewport {
    latitude: number,
    longitude: number,
    zoom: number,
    width: string,
    height: string
}

const Map = () => {
    const [food, setFood] = useState<PopulatedFoodObject[]>([])
    const [areaCodes, setAreaCodes] = useState<AreaCode[]>([])
    const [selectedArea, setSelectedArea] = useState('')
    const [viewport, setViewport] = useState<viewport>({
        latitude: 51.509865,
        longitude: -0.118092,
        zoom: 12,
        width: '100vw',
        height: '100vh'
    })

    const mapToken = process.env.REACT_APP_MAPBOX
    const geoToken = process.env.REACT_APP_GEO

    const getLatLng = async (postcode: string) => {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${geoToken}`)
        setAreaCodes((prevState: AreaCode[]) => {
            return [...prevState, {
                postcode: postcode,
                long: res.data.results[0].geometry.location.lng,
                lat: res.data.results[0].geometry.location.lat
            }]
        })
      }

      const getFood = async () => {
        await axios.get('/api/foods/map', {
            headers: { Authorization: '' }
          })
        .then(response => {
            const sortedFood = response.data.sort((a: PopulatedFoodObject, b: PopulatedFoodObject) => {
                var aLikes= a.likes.length;
                var bLikes= b.likes.length;
                var aDislikes = a.dislikes.length;
                var bDislikes = b.dislikes.length;
                
                // if the likes are the same sort place the one with the most dislikes below
                if(aLikes == bLikes)
                {
                    return (aDislikes < bDislikes) ? -1 : (aDislikes > bDislikes) ? 1 : 0;
                }
                else
                {
                    return (aLikes > bLikes) ? -1 : 1;
                }
            });
            setFood(sortedFood)
            let areaCodes: any[] = []
            response.data.map((food: PopulatedFoodObject) => {
                if (food.likes.length > 0) areaCodes.push(...food.likes)
                if (food.dislikes.length > 0) areaCodes.push(...food.dislikes)
            })
            let cleanAreaCodes: any[] = []
            areaCodes.map((code: any) => {
                cleanAreaCodes.push(code.area_code.toUpperCase())
            })
            const uniqueAreaCodes = cleanAreaCodes.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            return uniqueAreaCodes
          })
          .then((uniqueAreaCode) => {
              Promise.all(
                uniqueAreaCode.map(code => {
                    getLatLng(code)
                  })
              )
          })
          .catch(error => {
            console.error(error.response);
          });
    }

    useEffect(() => {
        getFood();
    }, [])

    const filterSelectedArea = () => {
        const newFood = [...food]
        const filteredFood = newFood.map((item: any) => {
            let newAreaLikes = 0
            let newAreaDislikes = 0
            const newLikesArray = item.likes.map((code: any) => code.area_code)
            const newDislikesArray = item.dislikes.map((code: any) => code.area_code)
            if (!newLikesArray.length && !newDislikesArray.length) return
            newLikesArray.map((areaCode: string) => {
                if (areaCode === selectedArea) ++newAreaLikes
            })
            newDislikesArray.map((areaCode: string) => {
                if (areaCode === selectedArea) ++newAreaDislikes
            })
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                likes: newAreaLikes,
                dislikes: newAreaDislikes,
                creator: item.creator,
                description: item.description,
                image: item.image
            }
          })
        const removedUnlikedFoods = filteredFood.filter(food => food !== undefined)
        const sortedLikes = removedUnlikedFoods.sort((a: any, b: any) => {
            var aLikes= a.likes.length;
            var bLikes= b.likes.length;
            var aDislikes = a.dislikes.length;
            var bDislikes = b.dislikes.length;
            
            // if the likes are the same sort place the one with the most dislikes below
            if(aLikes == bLikes)
            {
                return (aDislikes < bDislikes) ? -1 : (aDislikes > bDislikes) ? 1 : 0;
            }
            else
            {
                return (aLikes > bLikes) ? -1 : 1;
            }
        });
        return (
            <>
                <Div vertical={true} height='100px' width='100%'>
                <Typography variant='h2' color='primary'>{'Likes in: ' + selectedArea}</Typography>
                </Div>
                {sortedLikes.map((item: any) => (
                    <Card cardWidth='100%' vertical={false} key={item.name}>
                        <span style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '10px'}}>
                            <Typography variant='bodySmall' color='primary'>Likes: </Typography> 
                            <Typography variant='bodySmall' color='primary'>{item.likes}</Typography>
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '10px', marginLeft: '10px'}}>
                            <Typography variant='bodySmall'>Dislikes: </Typography>
                            <Typography variant='bodySmall'>{item.dislikes}</Typography>
                        </span>
                        <img src={'//' + item.image} alt={item.name} style={{maxWidth: '50px', height: '50px', objectFit: 'contain', marginRight: '10px', marginLeft: '10px'}} />
                        <Typography variant='bodySmall'>{item.name}</Typography>
                    </Card>
                ))}
            </>
        )
    }

    return (
        <Main direction='col'>
            <Div vertical={false} width='100%' height='100%'>
            <Div vertical={false} width='70%' height='100%'>
                <ReactMapGL 
                onClick={() => setSelectedArea('')}
                onViewportChange={(viewport: viewport) => {
                    setViewport(viewport)
                }}
                mapboxApiAccessToken={mapToken} 
                mapStyle='mapbox://styles/darbjm/ckl838ctb285d17o6spcoufmy'
                {...viewport}
                >
                    {areaCodes.map(code => (
                        <Marker key={code.postcode} latitude={code.lat} longitude={code.long}>
                            <Card handleClick={() => setSelectedArea(code.postcode)} cursor='pointer'>
                                <Typography variant='h2' color='primary'>{code.postcode}</Typography>
                            </Card>
                        </Marker>
                    ))}
                </ReactMapGL>
            </Div>
            <Div vertical={false} width='30%' height='100%' style={{ overflow: 'auto', maxHeight: '100vh' }}>
                {selectedArea ? filterSelectedArea() : 
                food.map(item => (
                    <Card cardWidth='100%' vertical={false} key={item.name}>
                        <span style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '10px'}}>
                            <Typography variant='bodySmall' color='primary'>Likes: </Typography>
                            <Typography variant='bodySmall' color='primary'>{item.likes.length}</Typography>
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '10px', marginLeft: '10px'}}>
                            <Typography variant='bodySmall'>Dislikes: </Typography>
                            <Typography variant='bodySmall'>{item.dislikes.length}</Typography>
                            </span>
                        <img src={'//' + item.image} alt={item.name} style={{maxWidth: '50px', height: '50px', objectFit: 'contain', marginRight: '10px', marginLeft: '10px'}} />
                        <Typography variant='bodySmall'>{item.name}</Typography>
                    </Card>
                ))}
            </Div>
            </Div>
        </Main>
    )
}

export default Map
