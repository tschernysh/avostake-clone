import {useEffect, useMemo, useState} from "react";
import {makeHash} from "../../utils/hashGenerator";

import s from './landing.module.scss'
import Config from "../../config";

import coinImage from 'media/img/coin-image.png'
import {FiArrowDownRight, FiArrowUpRight} from "react-icons/fi";

export const LastTransactions = () => {
    const [data, setData] = useState([]);

    const dataForDisplay = useMemo(() => {
        /*fetch(`https://avostake.com/api/getSiteTransactions?chainIds[]=56&address=${Config().STAKE_CONTRACT_ADDRESS}`)*/
        fetch(`https://avostake.com/api/getSiteTransactions?chainIds[]=56&address=0x7988bddb58439b9ab2675c85e85dd70a2720efb0`)
            .then((response) => response.body)
            .then((rb) => {
                const reader = rb.getReader();

                return new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({done, value}) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            });
                        }

                        push();
                    },
                });
            })
            .then((stream) =>
                new Response(stream, {headers: {"Content-Type": "text/html"}}).text()
            )
            .then((result) => {
                setData(JSON.parse(result)[56]
                    .splice(-3)
                    .sort((a, b) => b.timestamp - a.timestamp))
            }).catch(error => {
            console.log(error)
        })

    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section>
            <div className={s.landing__last_transactions}>
                <b>Last transactions</b>
                <table>
                    <tbody>
                    {data.map(t => {
                        return (
                            <tr key={t.timestamp}>
                                <td>
                                    <div>
                                        <small>Date/Time</small>
                                        <p>{new Date(t.timestamp * 1000).toLocaleDateString('en', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                            hour12: true,
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        })}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <small>Event</small>
                                        <p>{t.event_name === 'Withdraw' ? <FiArrowUpRight color={'red'}/> :
                                            <FiArrowDownRight color={'green'}/>}{t.event_name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <small>TXN Hash</small>
                                        <p>{t.transaction_hash.substring(0, 6)}...{t.transaction_hash.slice(-5)}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <small>Amount</small>
                                        <p><img src={coinImage} alt={'coinImage'}/>{t.amount.substring(0, 4)} BUSD</p>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <a target={'_blank'} href={'https://bscscan.com/address/0x7988bddb58439b9ab2675c85e85dd70a2720efb0'}>View
                    on BSCScan</a>
            </div>
        </section>

    )
}