import { getDocs, collection } from "firebase/firestore"; //get multiple docs from database
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export function Main() {
    const [postsList, setPostsList] = useState(null);
    const postsRef = collection(db, "posts");

    async function getPosts() {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return(
        <div>
            { postsList?.map((post)=>(<Post post={post}/>)) } 
            {/* the individual post that we mapped out of posts from DB is sent as the prop (where the prop variable is called post) */}
        </div>
    );
};