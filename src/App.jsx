import { useState } from "react"
import Header from "./components/Header"
import PostsList from "./components/PostsList"

import { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import SkeletonPost from "./components/skeletons/SkeletonPost";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  const [currentUserId, setCurrentUserId] = useState(0)

  const content = currentUserId === 0
    ? <h2 className="message">Select an employee to view posts</h2>
    : (
      // <ErrorBoundary fallback={<p className="error">An error has occurred.</p>}>
      <ErrorBoundary
        //? the component which loads on error
        FallbackComponent={ErrorFallback}
        //? on click of the function of the alert button 
        onReset={() => setCurrentUserId(0)}
        //? if this variable changes the component will reset it self
        resetKeys={[currentUserId]}
      >
        <Suspense fallback={[...Array(10).keys()].map(i => <SkeletonPost key={i} />)}>
          <PostsList currentUserId={currentUserId} />
        </Suspense>
      </ErrorBoundary>
    )

  return (
    <>
      <Header
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />
      {content}
    </>
  )
}

export default App
