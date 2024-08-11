import React, {useState} from 'react'

const ConfirmedEmail = () => {
    const [message, setMessage] = useState("");

    return (
        <>
          <div className="container">
            <div className="COnfirmEMailheader">
              <div className="text">Confirm Email</div>
              <br />
              <div className="underline"></div>
            </div>
            <div className="text ConfirmEmailText">
            Thank you for confirming your email!
              <br /> Please click the button to confirm and go back to Login Page
            </div>
              <div className="ConfirmEmailsubmit-container">
                <button type="submit" className="submit">
                  Confirm
                </button>
              </div>

            {message && <div className="message">{message}</div>}
          </div>
        </>
      );
    };

export default ConfirmedEmail