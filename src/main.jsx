import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Home from "../components/home_related/Home.jsx";
import NowPlaying from "../components/NowPlaying";
import {persistor, store} from "../components/redux/store.js";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <NowPlaying />
        </PersistGate>
    </Provider>
);
