
import error from "../assets/404 error with a tired person-pana.png"
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
    <img src={error} alt="Error" className="w-96 mx-auto" />
    <Link to="/">
      <button className="btn btn-outline bg-yellow-200 mt-5">Go home back</button>
    </Link>
  </div>
</div>
       </div>
    );
};

export default Error;