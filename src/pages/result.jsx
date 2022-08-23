import "../css/result.css"
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux/es/exports"


import { set_user } from "../store/counterslice"




import { auth } from "../config/firebase.js"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"






const App = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const count = useSelector(state => state.counter)




    const google_login = () => {






        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {



                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;


                const obj = { username: user.displayName, photoURL: user.photoURL, uid: user.uid }


                dispatch(set_user(obj))




            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // const email = error.email;

                // const credential = GoogleAuthProvider.credentialFromError(error);

            });





    }


    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    }


    const [data, setdata] = useState([])


    useEffect(() => {
        fetch("https://quiz-ser.herokuapp.com/get-result", {
            method: "GET",
            headers: headers
        })

            .then(r => r.json())
            .then(result => setdata(result))
    }, [1])




    return (
        <div className="base-result">


            <div className="left">



                <div className="left-part left-one"> <img referrerPolicy="no-referrer" src="https://img.icons8.com/ios/50/000000/canvas-student--v1.png" className="logo" /> </div>
                <div className="left-part left-two"> <img referrerPolicy="no-referrer" onClick={() => google_login()} src={count.current_user.photoURL} className="login_img" /> </div>
                <div className="left-part left-three" onClick={() => navigate("/quiz")}>Quiz</div>
                <div className="left-part left-four" onClick={() => navigate("/quiz/admin")}>Admin</div>
                <div className="left-part left-four" onClick={() => navigate("/quiz/result")}>Result</div>
                <div className="left-part logout">Logout</div>





            </div>





            <table className="table table-striped table-light">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student</th>
                        <th scope="col">Score</th>
                        <th scope="col">uid</th>
                    </tr>
                </thead>


                <tbody>


                    {
                        data.map((v, i) =>

                            <tr key={i}>
                                <th scope="row">{i}</th>
                                <td>{v.username}</td>
                                <td>{v.score}</td>
                                <td>{v.uid}</td>
                            </tr>
                        )

                    }



                </tbody>
            </table>

        </div>
    )
}


export default App