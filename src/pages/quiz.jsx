import { useState } from "react"

import "../css/quiz.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux/es/exports"


import { load_ques, set_user } from "../store/counterslice"




import { auth } from "../config/firebase.js"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"




const App = () => {

    const count = useSelector(state => state.counter)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [score, setscore] = useState(0)





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







    const submit_mcq = (correct) => {


        correct ? setscore(score + 1) : console.log("wrong ans")



        questions.length > no + 1 ?
            setno(no + 1)
            :

            save_response()









    }







    const save_response = () => {



        console.log("saving to database")
        setready(false);


        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        const data = { score: score, username: count.current_user.username, uid: count.current_user.uid }


        fetch("https://quiz-ser.herokuapp.com/save-response", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
        alert(`You scored ${score} / ${questions.length}`)
        setscore(0)

    }




    const [ready, setready] = useState(false)


    const [no, setno] = useState(0)



    // const questions = [
    //     { ques: "What is your name?", options: [{ text: "Mehdi", isCorrect: true }, { text: "Hamza", isCorrect: false }, { text: "Hammad", isCorrect: false }] }
    //     , { ques: "What is your age?", options: [{ text: "Mehdi", isCorrect: true }, { text: "Hamza", isCorrect: false }, { text: "Hammad", isCorrect: false }] }
    //     , { ques: "What is your edu?", options: [{ text: "Mehdi", isCorrect: true }, { text: "Hamza", isCorrect: false }, { text: "Hammad", isCorrect: false }] }




    // ]



    const questions = (count.questions)




    return (



        <div className="actual-base-quiz" >


            <div className="left">



                <div className="left-part left-one"> <img referrerPolicy="no-referrer" src="https://img.icons8.com/ios/50/000000/canvas-student--v1.png" className="logo" /> </div>
                <div className="left-part left-two"> <img referrerPolicy="no-referrer" onClick={() => google_login()} src={count.current_user.photoURL} className="login_img" /> </div>
                <div className="left-part left-three" onClick={() => navigate("/quiz")}>Quiz</div>
                <div className="left-part left-four" onClick={() => navigate("/quiz/admin")}>Admin</div>
                <div className="left-part left-four" onClick={() => navigate("/quiz/result")}>Result</div>

                <div className="left-part logout">Logout</div>





            </div>





            {count.current_user.username != "none" ?

                <div className="base-home">




                    {count.questions.length > 1 ?

                        <div className={ready == false ? "invisible" : "ques-box"}>




                            <span className="question-part">


                                <p className="serial">Question {no + 1}/  {questions.length} </p>
                                <p className="question">{questions[no].ques}</p>
                            </span>





                            <span className="answer-part">
                                {
                                    questions[no].options.map((v, i) => (<span onClick={() => submit_mcq(v.isCorrect)} key={i} className="options">{v.text}</span>))
                                }

                            </span>


                        </div>

                        :
                        null
                    }






                    {ready == false ?
                        <div className="ques-box">

                            {/* <p>You scored has been recorded {score} / {questions.length}</p> */}
                            <button className="btn btn-outline-primary" onClick={() => {
                                setready(true);
                                setno(0);

                                const headers = {
                                    'Content-Type': 'application/json;charset=UTF-8',
                                    "Access-Control-Allow-Origin": "*",
                                    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                                    'Access-Control-Allow-Headers': '*'
                                }

                                fetch('https://quiz-ser.herokuapp.com/fetchquiz', {

                                    method: "GET",
                                    headers: headers

                                })
                                    .then(r => r.json())
                                    .then(data => dispatch(load_ques(data[0].questions)))
                                    .catch(err => console.log(err))




                            }}>Start Quiz</button>

                        </div>
                        :
                        null
                    }



                    <div className="score">{score}</div>
                </div>
                :
                <div onClick={() => google_login()} className="base-home">Please log in to attempt quiz</div>
            }


        </div>

    )

}



export default App