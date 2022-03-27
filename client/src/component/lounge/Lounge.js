import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Alert from "../views/Alert";
import "../../assets/css/lounge/Lounge.css";

function Lounge() {
    const dispatch = useDispatch();
    var { state } = useLocation();

    // alert 관련
    let [showAlert, setShowAlert] = useState(false);
    let [alertTitle, setAlertTitle] = useState("");
    let [alertSubtitle, setAlertSubtitle] = useState("");

    useEffect(() => { // 띄울 alert가 있으면 띄움
        if (state) {
            if (state.alert) {
                var alertInfo = state.alert;
                setAlertTitle(alertInfo.title);
                setAlertSubtitle(alertInfo.subtitle);
                setShowAlert(true);
            }
        }
    }, [])

    useEffect(()=> { // menu 바꾸기
        dispatch({type: 'MENU', data: 'lounge'});
    }, [])

    return (
        <div className="lounge">
            <Alert alertTitle={alertTitle} alertSubtitle={alertSubtitle} showAlert={showAlert} setShowAlert={setShowAlert}/>
            여기는 라운지 페이지 입니다.
        </div>
    )
}

export default Lounge;