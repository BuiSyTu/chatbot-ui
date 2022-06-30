import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { FallbackView } from 'src/_metronic/partials'

const CategoriesPage = () => {
    const BotPage = lazy(() => import('./Bot'))
    const EntityPage = lazy(() => import('./Entity'))
    const IntentPage = lazy(() => import('./Intent'))
    const KeywordPage = lazy(() => import('./Keyword'))
    const SentencePage = lazy(() => import('./Sentence'))

    return (
        <Suspense fallback={<FallbackView />}>
            <Switch>
                <Route path='/categories/bot' component={BotPage}></Route>
                <Route path='/categories/entity' component={EntityPage}></Route>
                <Route path='/categories/intent' component={IntentPage}></Route>
                <Route path='/categories/keyword' component={KeywordPage}></Route>
                <Route path='/categories/sentence' component={SentencePage}></Route>
            </Switch>
        </Suspense>

    )
}

export default CategoriesPage