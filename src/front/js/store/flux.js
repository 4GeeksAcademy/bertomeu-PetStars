import Swal from 'sweetalert2';

const getState = ({ getStore, getActions, setStore }) => {
    const apiEndpoint = process.env.BACKEND_URL;

    return {
        store: {
            user: null,
            posts: [],
            comments: [],
            forumTopics: [],
            topicResponses: []
        },
        actions: {
            
            register: async (email, password, confirmPassword, petStar, userPhoto, breed, birthDate, hobbies) => {
                if (password !== confirmPassword) {
                    Swal.fire({
                        icon: "error",
                        title: "Passwords do not match",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    return;
                }
                try {
                    const response = await fetch(`${apiEndpoint}/api/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password, petStar, userPhoto, breed, birthDate, hobbies })
                    });

                    const data = await response.json();
                    if (data.msg === 'The email used is already in use') {
                        throw new Error('The email used is already in use');
                    } else {
                        setStore({ user: data });
                        Swal.fire({
                            icon: "success",
                            title: "New user created",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            },

            /
            login: async (email, password) => {
                try {
                    const response = await fetch(`${apiEndpoint}/api/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();
                    if (data.msg === 'Invalid email or password') {
                        throw new Error('Invalid email or password');
                    } else {
                        localStorage.setItem('token', data.jwt_token);
                        setStore({ user: data.user_data });
                        Swal.fire({
                            icon: "success",
                            title: "Login successful",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            },

            // Logout user
            logout: () => {
                localStorage.removeItem('token');
                setStore({ user: null });
                Swal.fire({
                    icon: "success",
                    title: "Logout successful",
                    showConfirmButton: false,
                    timer: 2000
                });
            },

           
            getUserInfo: async () => {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const response = await fetch(`${apiEndpoint}/api/user`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        const data = await response.json();
                        setStore({ user: data });
                    } catch (error) {
                        console.error(error);
                        Swal.fire({
                            icon: "error",
                            title: error.message,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "You must log in to access this information",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            },

            
            modifyUserInfo: async (userPhoto, petStar, breed, birthDate, hobbies) => {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const response = await fetch(`${apiEndpoint}/api/user`, {
              

