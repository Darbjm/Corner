/// <reference types="react-scripts" />
/// <reference types="redux-persist" />
declare global {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test',
        PUBLIC_URL: string,
        REACT_APP_MAPBOX: string,
        REACT_APP_GEO: string
        }
    }
