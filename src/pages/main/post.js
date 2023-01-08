import { addDoc, getDocs, collection, query, where, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './post.css';
import { useEffect, useState } from 'react';
import { number } from 'yup';

// interface Like{
//     userId: String;
// }

export function Post(props) { //i am passing props to this component
    const { post } = props; //the props is called post

    const [user] = useAuthState(auth);

    const [numberOfLikes, setNumberOfLikes] = useState(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    async function getLikes() {
        const data = await getDocs(likesDoc);
        // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); this is to get all the likes details
        // console.log(data.docs.length); //the data is an array and we need it length
        // setNumberOfLikes(data.docs.length); //commenting this because using the line below to ensure one account doesnt like twice
        setNumberOfLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));  //so setNumberOfLikes sets the numberOfLikes containing a list of userIds who have liked the tweet
    };

    async function addLike() {
        try {
            await addDoc(likesRef, {
                userId: user?.uid, //this comes from firebase auth
                postId: post?.id, //this comes from the prop
            });
            //however a problem we face is that the likes dont update automatically and the page has to be refreshed, hence we add this quick fix below
            if (user) /*ensuring we go the code below only if we have a user*/ {
                setNumberOfLikes((prev) => prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]);
            }
            //basically i am setting the number of likes array to what it was previously plus myself (current userId) and i will do that only if a previous state existed otherwise i will just add myself
            //await addDoc definitely sends it to the database and i forcefully update my UI as well 
        } catch (err) {
            console.log(err);
        } //so we may come across a case where the API request to send data to DB didn't work but we end up manually updating the console so to avoid it we have nested both the commands in a single try block
    };

    async function removeLike() {
        try {
            const likeToBeDeletedQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user.uid));

            const likeToDeleteData = await getDocs(likeToBeDeletedQuery);

            const likeToBeDeleted = doc(db, "likes", likeToDeleteData.docs[0].id);
            await deleteDoc(likeToBeDeleted);
            if (user) {
                setNumberOfLikes((prev)=>prev?.filter((like)=>like.id === likeToDeleteData.docs[0].id)) //this instructs to filter out the likes data where like id is equal to my id thus my like gets removed
            }
        } catch (err) {
            console.log(err);
        }
    };

    const haveYouLiked = numberOfLikes?.find((like) => like.userId === user?.uid); //in find function we loop over the data structure and find something for a particular condition

    useEffect(() => {
        getLikes();
    }, []); //add an [] so that the function is run only when the component is mounted and not when it updates

    return (
        <div className="feed" >
            <div className="title" > <h1> {post.title} </h1> </div>  {/*since i have called my props as post and in that post(props) i have passed the actual post (queried from DB) and since that post (the Database) has title, username,desc etc we're using it  */}
            <div className="body" > <p> {post.description} </p> </div>
            <div className="footer" >
                <p> by @{post.username} </p>
                <button onClick={ haveYouLiked? removeLike : addLike } > {haveYouLiked ? <>&#128078;</> : <>&#128077;</>} </button>
                {numberOfLikes && <p className='like'>Likes: {numberOfLikes?.length} </p>}
                {/* this because we want to show the likes only if it exists */}
            </div>
        </div>
    );
};