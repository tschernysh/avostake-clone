import { BrowserRouter, Routes } from "react-router-dom";

import { RouterComponent } from "./routes/RouterComponent";
import { routerSchema } from "./routes/routerSchema";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";
import { AccountActionCreator } from "store/reducers/account/action-creator";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ApplicationActionCreator.getDefaultReferrer())
    dispatch(AccountActionCreator.getLeaderProgressData())
    dispatch(AccountActionCreator.getUserInfo())
  }, [])

  return (
    <BrowserRouter>
      <Routes>{routerSchema.map(RouterComponent)}</Routes>
    </BrowserRouter>
  )
}
export default App;
