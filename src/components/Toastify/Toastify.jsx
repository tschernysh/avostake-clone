import {useContext, useEffect, useRef} from "react";
import {ToastifyContext} from "../../applicationContext";
import s from './toastify.module.scss'
import {AiOutlineWarning} from "react-icons/ai";
import {FaCheck} from "react-icons/fa";
import {BiErrorCircle} from "react-icons/bi";
import {VscLoading} from "react-icons/vsc";
import {IoMdNotificationsOutline} from "react-icons/io";

const toastsIcons = {
    'warning': <AiOutlineWarning/>,
    'success': <FaCheck/>,
    'error': <BiErrorCircle/>,
    'default': <IoMdNotificationsOutline/>,
    'loader': <VscLoading/>
}

export const Toastify = () => {
    const {setToasifyData, toastifyData} = useContext(ToastifyContext)
    const timeout = useRef(null)

    useEffect(() => {
        if (toastifyData?.duration) {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                setToasifyData(null);
            }, [toastifyData.duration])
        }
    }, [toastifyData])

    return (
        <div className={s.toastify}>
            {toastifyData && (
                <div data-toast-type={toastifyData.type} className={s.toastify__tile}>
                    {toastsIcons[toastifyData.type]}
                    <p>{toastifyData.text}</p>
                </div>
            )}
        </div>
    )
}