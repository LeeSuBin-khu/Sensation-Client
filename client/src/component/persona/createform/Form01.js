import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function Form01(props) {
    const cookies = new Cookies();
    let [disabled, setDisabled] = useState(false);
    let [profileSrc, setProfileSrc] = useState("");
    let [nickNameValidation, setNickNameValidation] = useState(false);
    let [nickNameMsg, setNickNameMsg] = useState("");
    let [tempNickName, setTempNickName] = useState(props.nickname);
    let [isComplete, setIsComplete] = useState(false);

    const readImage = (input) => {
        // file이 존재하는 경우
        if (input.files && input.files[0]) {
            console.log(input);
            const reader = new FileReader()
            reader.onload = e => {
                setProfileSrc(e.target.result)
                console.log(profileSrc);
            }
            reader.readAsDataURL(input.files[0])
        }
    }

    const NickNameChange = (e) => {
        props.setNickName("")
        setTempNickName(e.target.value)
        setNickNameValidation(false)
        setNickNameMsg("닉네임 중복 검사를 해주세요")
    }

    const validationCheck = async () => {
        var token = cookies.get('token');
        const temp = tempNickName;
        try {
            const res = await axios.get(
                'http://163.180.117.22:7218/api/persona/duplicate?nickname=' + temp, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )
            const duplicate = res.data;
            setNickNameValidation(!duplicate); 
            if (duplicate) {
                setNickNameMsg("이미 사용중인 닉네임입니다.");
            } else {
                setNickNameMsg("사용 가능한 닉네임입니다.");
                props.setNickName(tempNickName);
            }       
        } catch (err) {
            console.log(err);
        }
    }

    const formValidationCheck = () => {
        var validation = true;
        var alertMsg = "";
        if (nickNameValidation) {
            alertMsg += "닉네임 중복검사를 해주세요! \n"
        }

        if (props.nickname == "") {
            validation = false
            alertMsg += " 닉네임"  
        }
        if (props.job == "") {
            validation = false
            alertMsg += " 직업"
        }
        if (props.age == false) {
            validation = false
            alertMsg += " 나이"
        }
        if (props.gender == false) {
            validation = false
            alertMsg += " 성별"
        }
        
        if (validation) {
            props.nextPage();
        } else {
            alertMsg += "칸이 누락되었어요!\n 다시 한번 확인해주세요!"
            alert(alertMsg);
        }
    }

    return (
        <div style={{width:'100%'}}>
            <div className="input-wrapper">
                <label htmlFor="profile">
                    프로필 사진
                </label>
                    <input
                        id="profile-photo"
                        className="profile-photo-input"
                        type="file"
                        style={{ display: 'none'}}
                        onChange={ (e)=>{ readImage(e.target) } }
                    />
                    <div id="profile-photo-preview" style={{backgroundImage: 'url('+profileSrc+')'}}>
                    <label htmlFor="profile-photo" id="profile-photo-label"></label> 
                    </div>            

            </div>

            <div className="input-wrapper">
                <label htmlFor="nickname">
                    닉네임
                </label>
                <div style={{width:'100%', display: 'flex', alignItems: 'baseline'}}>
                <div>
                    <input
                        style={{width: '300px'}}
                        id="nickname"
                        type="text"
                        placeholder="활동할 페르소나의 닉네임을 입력해주세요."
                        onChange={ NickNameChange }
                        value={ tempNickName }
                    />
                    <div
                     style={{ position: 'relative', right: '-70px', color: (nickNameValidation ? '#0075FF' : '#F24822') }}
                     className="alert-msg">{ nickNameMsg }
                     </div>
                </div>
                <button className="check-validation-btn"
                onClick={ validationCheck }>
                    중복 확인
                </button>
                </div>
            </div>

            <div className="input-wrapper">
                <label htmlFor="job">
                    현재 직업
                </label>
                <input
                    style={{width: '300px'}}
                    id="job"
                    type="text"
                    placeholder="현재 직업을 입력해주세요."
                    onChange={ (e)=>{ props.setJob(e.target.value) } }
                    value={ props.job }
                />
            </div>

            <div className="input-wrapper">
                <label htmlFor="age">
                    나이
                </label>
                <input
                    style={{width: '300px'}}
                    id="age"
                    type="number"
                    placeholder="나이를 입력해주세요."
                    onChange={ (e)=>{ props.setAge(e.target.value) } }
                    value={ props.age }
                />
            </div>

            <div className="input-wrapper">
                <label htmlFor="gender">
                    성별
                </label>
                <div className="radio-wrapper">
                    <div className="radio-elem">
                        <input
                            id="female"
                            type="radio"
                            value="1"
                            checked={props.gender==='1'}
                            name="gender"
                            onChange={ (e)=>{props.setGender(e.target.value)} }
                        />
                        <label htmlFor="female">
                            여
                        </label>
                    </div>

                    <div className="radio-elem">
                        <input
                            id="male"
                            type="radio"
                            value="2"
                            checked={props.gender==='2'}
                            name="gender"
                            onChange={ (e)=>{props.setGender(e.target.value)} }
                        />
                        <label htmlFor="male">
                            남
                        </label>
                    </div>
                </div>

            </div>

            <button className="small-btn" onClick={formValidationCheck}>
                다음
            </button>
        </div>
    );
}

export default Form01;