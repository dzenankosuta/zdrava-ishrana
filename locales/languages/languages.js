import { useSelector } from 'react-redux';

const data = () => {
  const data = useSelector((state) => state.lang);
  return data;
};
export default data;
