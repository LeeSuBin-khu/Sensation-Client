import { useEffect, useRef, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import SlideBtn from '../views/SlideBtn';
import { getApi } from '../state';
import { imgBox, defaultText } from './atoms';
import { DEFAULT_BG_STYLE } from "./atomStyleSheet";

import NonGraphic from '../views/NonGraphic';

function OrganismsImg() {
    const waitImgRef = useRef();
    //채연-라운지 대기 누르면 dispatch({type: 'LOUNGE_WAIT', data: `wait ${response.data}`})
    const wait = useSelector((state) => state.loungeWait);
    const [loungeList, setLoungeList] = useState();

    useMemo(() => {
        getApi(`${process.env.REACT_APP_SERVER_HOST}/api/lounge/wait`).then((data) => setLoungeList(data.data));
    }, [wait])

    return (
        <>
        {loungeList !== undefined?
        loungeList.length !== 0?
        <SlideBtn>
        <div ref={waitImgRef} className="OrganismsImg-Container" style={{background: 'pink', width: '813px', height: '400px', paddingLeft: '18px', paddingRight: '18px', paddingBottom: '12px'}}>
            <div className="slidebox-container">
                {loungeList.map( lounge => 
                <>
                    {imgBox(lounge.lounge)}
                </>    
                )}
            </div>
        </div>
        </SlideBtn>
        :
        <div ref={waitImgRef} className="OrganismsImg-Container" style={{...DEFAULT_BG_STYLE, width: '813px', height: '400px', paddingLeft: '18px', paddingRight: '18px', paddingBottom: '12px'}}>
            <NonGraphic type={'lounge'} isImg={true} mainText={defaultText} subContent={{type: 'text', content: '라운지에 참여해 소통을 시작하세요 :)'}}/> 
        </div>
        :<></>}
        </>
    );
}

export default OrganismsImg;