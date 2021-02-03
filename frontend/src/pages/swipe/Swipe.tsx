import React, {useEffect} from 'react';
import axios from 'axios'
import Card from '../../components/card';
import Typography from '../../components/typography';
import Button from '../../components/button';
import { Main, Div } from '../../styles/BasicComponents.style'

const Swipe = () => {
  const dispatch = useDispatch();
  const profile = useSelector<UserState, any>(state => state.user);
  const [searchError, setErrorMessage] = useState({});
  const [foods, setFoods] =  useState<any[]>([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    const getData = async () => {
      await axios.get('api/foods/random')
      .then(response => {
        setFoods(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
    getData();
  }, []);

  const handleChange = (elName: string, value: string | undefined) => {
    if (value) {setSearch(value)}
  };
  return (
    <Main>
      <Card cardWidth='40%'>
        <Typography variant="h4" color="primary">
          Working
        </Typography>
        <Div width='100%' height='auto' vertical={false}>
          <Button buttonSize='medium' color='primary' isFullWidth={false}>
            NO
          </Button>
          <Button buttonSize='medium' color='secondary' isFullWidth={false}>
            YES
          </Button>
        </Div>
      </Card>
    </Main>
  );
}

export default Swipe;
