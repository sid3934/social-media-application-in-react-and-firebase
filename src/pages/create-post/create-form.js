import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"; //addDoc is a function you call when you want to add a document to your database
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./createForm.css";
import {useNavigate} from "react-router-dom";

export function CreateForm() {
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("Title is a must :p"),
        description: yup.string().required("Express yourself"),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, "posts");

    const navigate = useNavigate(); 


    async function afterCreatingPost(data) {
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            //title and description can also be written as ...data because data is an object containing title and description i can destructure it
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit(afterCreatingPost)} >
            <div className="form">
                <input className="ib" placeholder="Title of your post" {...register("title")} />
                <textarea placeholder="Detailed description of your post" {...register("description")} />
                <input className="ib" type="submit" />
            </div>
        </form>
    );
};