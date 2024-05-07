import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container" style={{gap: '5em'}}>
        <h1 className="title">404</h1>
        <p className="subtitle">Página não encontrada...</p>
        <button className='btn' onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </>
  );
}

export default NotFound;
