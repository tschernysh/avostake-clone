import {useEffect, useMemo, useState} from "react";
import {makeHash} from "../../utils/hashGenerator";

import s from './landing.module.scss'

export const LastTransactions = () => {
    const [data, setData] = useState([]);

    const dataForDisplay = useMemo(() => {
        fetch("https://avostake.com/api/getSiteTransactions?chainIds[]=56&address=0x7988bddb58439b9ab2675c85e85dd70a2720efb0")
            .then((response) => response.body)
            .then((rb) => {
                const reader = rb.getReader();

                return new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({ done, value }) => {
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
                new Response(stream, { headers: { "Content-Type": "text/html" } }).text()
            )
            .then((result) => {
                setData(JSON.parse(result)[56].splice(-3))
            });

    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className={s.landing__last_transactions}>
            <b>Last transactions</b>
        </div>
    )
}