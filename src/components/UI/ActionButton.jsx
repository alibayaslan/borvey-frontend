import {useEffect} from 'react'
import swal from 'sweetalert';
import Swal from 'sweetalert2';

const ActionButton = ({success, error, loading, path, message, content}) => {
  
  useEffect(() => {
    if (success) {
      swal('Onaylandı!', message, 'success').then(() => {
        window.location.replace(path);
      });
    }
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bir hata oluştu!',
        confirmButtonText: 'Tamam',
      });
    }
  }, [success, error, path]);
  return (
    <button type="submit" disabled={loading}
    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
    >
      {loading ? (
        <span>Loading...</span>
      ) : (
        <span>{content}</span>
      )}
    </button>
  )
}

export default ActionButton