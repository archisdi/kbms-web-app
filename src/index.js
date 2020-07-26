import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "./@fake-db"
import Spinner from "./components/@vuexy/spinner/Fallback-spinner"
import "./index.scss"
import { store } from "./redux/storeConfig/store"
import * as serviceWorker from "./serviceWorker"
import { Layout } from "./utility/context/Layout"

const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Layout>
            <LazyApp />
        </Layout>
      </Suspense>
    </Provider>,
  document.getElementById("root")
)

/** service worker */
serviceWorker.unregister()
