import {BrowserRouter, Routes} from "react-router-dom";

import {RouterComponent} from "./routes/RouterComponent";
import {routerSchema} from "./routes/routerSchema";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>{routerSchema.map(RouterComponent)}</Routes>
        </BrowserRouter>
    )
}
export default App;
