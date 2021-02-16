import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

import Main from '../../components/mainPage'
import { Div, justify } from '../../styles/BasicComponents.style'

const Map = () => {
    const [viewport, setViewport] = useState({
        latitude: 51.509865,
        longitude: -0.118092,
        zoom: 10,
        width: '100vw',
        height: '100vh'
    })

    const token = process.env.REACT_APP_MAPBOX

    return (
        <Main direction='col'>
            <Div vertical={false} width='100%' height='100%'>
            {console.log(token)}
                <ReactMapGL {...viewport}>
                </ReactMapGL>
            </Div>
        </Main>
    )
}

export default Map
