import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container" style={{marginTop: '10em', gap: '5em'}}>
        <h1 className="title">404</h1>
        <p className="subtitle">Página não encontrada...</p>
        <Button path={-1} filled={true} text="Voltar" padding="1em 3em" fontSize="1.5em"/>
      </div>
    </>
  );
}

export default NotFound;
