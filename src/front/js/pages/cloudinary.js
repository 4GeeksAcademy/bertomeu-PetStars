import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Cloudinary = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [petStar, setPetStar] = useState('');
    const [image, setImage] = useState('');  //Cloudinary
    const [loading, setLoading] = useState(false);  //Cloudinary
    const [uploadedImage, setUploadedImage] = useState('');   //Cloudinary
    //login cloudinary
    const preset_name = process.env.CLOUDINARY_PRESET_NAME;
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;

    const uploadImage = async () => {
        const files = image
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', preset_name)

        setLoading(true)

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            let userPhoto = file.secure_url
            setUploadedImage(userPhoto)
            await actions.register(email, password, confirmPassword, petStar, userPhoto);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadImage()
    };
    return (
        <form id="register-form" className="container p-5 my-5 border border-success-subtle border-3" onSubmit={handleSubmit}>
            <h2 className="text-center" >Register</h2>
            <div className="form-group py-3">
                <label className="ms-3 pb-3 fs-3" for="email">Email:</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group py-3 fs-3">
                <label className="ms-3 pb-3" for="password">Password:</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group py-3 fs-3">
                <label className="ms-3 pb-3" for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div className="form-group py-3 fs-3">
                <label className="ms-3 pb-3" for="petStar">PetStar:</label>
                <input type="text" id="petStar" name="petStar" className="form-control" placeholder="PetStar" required onChange={(e) => setPetStar(e.target.value)} />
            </div>
            <div className="form-group py-3 fs-3">
                <label className="ms-3 pb-3" for="userPhoto">UserPhoto:</label>
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <img src={uploadedImage} onError={(event) => {
                        event.currentTarget.onerror = null; // prevents loop
                        event.currentTarget.src = "https://res.cloudinary.com/dyvut6idr/image/upload/v1726081257/SALE_qqx0ij.jpg";
                    }} alt="imagen subida" height="60"/>
                )}
                <input type="file" id="userPhoto" name="userPhoto" className="form-control" placeholder="UserPhoto" onChange={(e) => setImage(e.target.files)} />
            </div>
            <div className="d-flex justify-content-center py-3">
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
        </form>
    );
};

