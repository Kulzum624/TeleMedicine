import { Suspense } from 'react';
import Loader from '../components/common/Loader';

const withSuspense = (Component) => {
  return (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default withSuspense;
