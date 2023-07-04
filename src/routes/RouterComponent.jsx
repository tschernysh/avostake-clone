import {Route} from "react-router-dom";

export const RouterComponent = ({children, parentKey = '', ...args}, index) => {
    return (
        <Route key={`${parentKey}${index}`} {...args} children={children?.map((route, _index) => {
            return RouterComponent({...route, parentKey: `${parentKey}${index}`}, _index)
        })}/>
    )
}
