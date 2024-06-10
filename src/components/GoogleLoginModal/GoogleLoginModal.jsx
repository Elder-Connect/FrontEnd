
import GoogleBtn from '../Header/GoogleBtn/GoogleBtn';
import './GoogleLoginModal.css';

function GoogleLoginModal({ isOpen, setIsOpen }) {
  if (!isOpen) return null;
  
  if(localStorage.getItem("accessToken")) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Login</h2>
          <button onClick={() => setIsOpen(false)} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          <GoogleBtn setModalState={setIsOpen} />
        </div>
      </div>
    </div>
  );
}

export default GoogleLoginModal;
