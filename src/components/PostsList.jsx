import useSWR from 'swr'

import {
    getPostsByUserId,
    postsUrlEndpoint as postsCacheKey
} from '../api/postsApi'

import {
    getUserById,
    usersUrlEndpoint as usersCacheKey
} from '../api/usersApi'

import Post from './Post'
import SkeletonPost from './skeletons/SkeletonPost'

const PostsList = ({ currentUserId }) => {

    const {
        //? REMOVED: its being handled by react suspense now
        // isLoading,
        //? REMOVED: its being handled by react-error-boundary
        // error,
        data: posts,
    } = useSWR(
        [postsCacheKey, currentUserId],
        ([url, userId]) => getPostsByUserId(url, userId),
        { suspense: true }
    )

    const {
        //? REMOVED: its being handled by react suspense now
        // isLoading: isLoadingUser,
        //? REMOVED: its being handled by react-error-boundary
        // error: userError,
        data: user
    } = useSWR(
        posts?.length ? [usersCacheKey, currentUserId] : null,
        ([url, userId]) => getUserById(url, userId),
        { suspense: true }
    )
    //? with react suspense we can get rid of these conditional checks
    // let content
    // if (currentUserId === 0) {
    //     console.log(currentUserId);
    //     content = <p className="loading">Select an Employee to view posts</p>
    // } else if (isLoading || isLoadingUser) {
    //     content = (
    //         [...Array(10).keys()].map(i => {
    //             return <SkeletonPost key={i} />
    //         })
    //     )
    // } else if (error || userError) {
    //     content = <p>{error.message || userError.message}</p>
    // } else {
    const content = (
        <main>
            {posts.map(post => {
                return <Post key={post.id} post={post} user={user} />
            })}
        </main>
    )
    // }

    return content
}
export default PostsList