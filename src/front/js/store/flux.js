import Swal from 'sweetalert2'

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
			// Use getActions to call a function within a fuction
			register: async (email, password, confirmPassword, petStar, userPhoto, breed, birthDate, hobbies) => {
				if (password !== confirmPassword) {
					Swal.fire({
						icon: "error",
						title: "Password do not match",
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
			sendRestorePassword: async (email) => {
				try {
				  const response = await fetch(`${apiEndpoint}/api/restorePassword`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email })
				  });
			  
				  const data = await response.json();
				  if (data.msg === 'UUID generated successfully') {
					Swal.fire({
					  icon: "success",
					  title: "Email sent",
					  showConfirmButton: false,
					  timer: 2000
					});
				  } else {
					throw new Error('Email not found');
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
			addRestorePassword: async (uuid, restorePassword, confirmRestorePassword) => {
				if (restorePassword !== confirmRestorePassword) {
					Swal.fire({
						icon: "error",
						title: "New password do not match",
						showConfirmButton: false,
						timer: 2000
					});
					return;
				}
				try {
					const response = await fetch(`${apiEndpoint}/api/restorePassword`, {
					  method: 'PUT',
					  headers: { 'Content-Type': 'application/json' },
					  body: JSON.stringify({ uuid: uuid, password: restorePassword })
					});
				
					const data = await response.json();
					if (data.msg === 'Password changed successfully') {
					  Swal.fire({
						icon: "success",
						title: "Password changed successfully",
						showConfirmButton: false,
						timer: 2000
					  });
					} else {
					  throw new Error('Link expired');
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
			changePassword: async (oldPassword, newPassword, confirmNewPassword) => {
				const token = localStorage.getItem('token');
				if (token) {
					if (oldPassword !== newPassword) {
						Swal.fire({
							icon: "error",
							title: "New password must be different from old password",
							showConfirmButton: false,
							timer: 2000
						});
						return;
					}
					if (newPassword !== confirmNewPassword) {
						Swal.fire({
							icon: "error",
							title: "New password do not match",
							showConfirmButton: false,
							timer: 2000
						});
						return;
					}
					try {
						const response = await fetch(`${apiEndpoint}/api/changePassword`, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ password: newPassword })
						});
						
						const data = await response.json();
						if (data.msg === 'Invalid old password') {
							throw new Error('Invalid old password');
	
						} else {
						setStore({ user: data });
						}
					} catch (error) {
						console.error(error);
						Swal.fire({
							icon: "error",
							title: error,
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
							title: error,
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
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ userPhoto, petStar, breed, birthDate, hobbies })
						});
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						const data = await response.json();
						setStore({ user: data });
						Swal.fire({
							icon: "success",
							title: "Information updated successfully",
							showConfirmButton: false,
							timer: 2000
						});
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
			addPost: async (postPhoto, postText) => {
				const token = localStorage.getItem('token');
				if (token) {
					try {

						const response = await fetch(`${apiEndpoint}/api/post`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ postPhoto, postText })
						});
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						const data = await response.json();
						setStore({ posts: [...getStore().posts, data] });
						Swal.fire({
							icon: "success",
							title: "New post created",
							showConfirmButton: false,
							timer: 2000
						});
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
			getSinglePosts: async () => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const token = getStore().user.jwt_token;
						const response = await fetch(`${apiEndpoint}/api/singlePosts`, {
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
						setStore({ posts: data });
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
			getAllPosts: async () => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/allPosts`, {
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
						setStore({ posts: data });
					} catch (error) {
						console.error(error);
						Swal.fire({
							icon: "error",
							title: error.message,
							showConfirmButton: false,
							timer: 2000
						});;
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
			addCommentPost: async (postId, commentPostText) => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/commentPost/${postId}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ commentPostText })
						});
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						const data = await response.json();
						setStore({ comments: [...getStore().comments, data] });
						Swal.fire({
							icon: "success",
							title: "New comment post text created",
							showConfirmButton: false,
							timer: 2000
						});
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
			getAllCommentPost: async (postId) => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/commentPost/${postId}`, {
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
						setStore({ comments: data });
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
			addForumTopic: async (forumTopicTittle, forumTopicText) => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/forumTopic`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ forumTopicTittle, forumTopicText })
						});
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						const data = await response.json();
						setStore({ forumTopics: [...getStore().forumTopics, data] });
						Swal.fire({
							icon: "success",
							title: "New forum topic created",
							showConfirmButton: false,
							timer: 2000
						});
					}
					catch (error) {
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
			getSingleForumTopics: async () => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const token = getStore().user.jwt_token;
						const response = await fetch(`${apiEndpoint}/api/singleForumTopics`, {
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
						setStore({ forumTopics: data });
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
			getAllForumTopics: async () => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/allForumTopics`, {
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
						setStore({ forumTopics: data });
					} catch (error) {
						console.error(error);
						Swal.fire({
							icon: "error",
							title: error.message,
							showConfirmButton: false,
							timer: 2000
						});;
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
			addTopicResponse: async (forumTopicId, topicResponseText) => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/commentPost/${forumTopicId}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ topicResponseText })
						});
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						const data = await response.json();
						setStore({ topicResponses: [...getStore().topicResponses, data] });
						Swal.fire({
							icon: "success",
							title: "New topic response text created",
							showConfirmButton: false,
							timer: 2000
						});
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
			getAllTopicResponse: async (forumTopicId) => {
				const token = localStorage.getItem('token');
				if (token) {
					try {
						const response = await fetch(`${apiEndpoint}/api/commentPost/${forumTopicId}`, {
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
						setStore({ topicResponses: data });
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

		}
	};
};

export default getState;
