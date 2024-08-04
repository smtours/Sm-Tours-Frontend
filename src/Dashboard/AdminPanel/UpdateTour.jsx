import 'react-toastify/dist/ReactToastify.css';
import {  useParams } from 'react-router-dom';
import BASE_URL from '../../utils/config'
import useFetch from '../../hooks/useFetch';
import UpdateToursComp from './UpdateTourComp'

const UpdateTours = () => {
  const { id } = useParams();
  const {apiData: tour, error} = useFetch(`${BASE_URL}/tour/${id}`)
  return (
    <div className="min-h-screen md:min-h-[400px] flex items-center justify-center bg-gray-100">
      <UpdateToursComp tour={tour} id={id} />
    </div>
  );
};

export default UpdateTours;
