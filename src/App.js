
import './App.scss';
import TableUsers from './components/TableUsers';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';

import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <TableUsers />
        </Container>

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" y
      />
      {/* Same as */}

    </>

  );
}

export default App;
