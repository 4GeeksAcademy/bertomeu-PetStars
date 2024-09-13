import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const handleLogout = () => {
		actions.logout();
	};

	return (
		<div >
			{
				store.user ?
					<nav className="navbar navbar-expand-lg navbar-light">
						<div className="container">
							<a className="navbar-brand" href="#"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725640842/Logo_PetStar-removebg-preview_oo91wx.png" alt="PetStar" height="40" /></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
								<ul className="navbar-nav mx-auto">
									<li className="nav-item"><a className="nav-link" href="/">Home</a></li>
									<li className="nav-item"><a className="nav-link" href="#">Foro</a></li>
									<li className="nav-item"><a className="nav-link" href="#">Search</a></li>
									<li className="nav-item"><a className="nav-link" href="#">Services</a></li>
									<li className="nav-item"><a className="btn btn-primary ml-2" href="/" onClick={handleLogout}>Log out</a></li>
								</ul>
							</div>
						</div>
					</nav> :
					<>
						<nav class="navbar navbar-expand-lg navbar-light">
							<div class="container">
								<a class="navbar-brand" href="#"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725640842/Logo_PetStar-removebg-preview_oo91wx.png" alt="PetStar" height="40" /></a>
								<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
									<span class="navbar-toggler-icon"></span>
								</button>
								<div class="collapse navbar-collapse" id="navbarNav">
									<ul class="navbar-nav ml-auto">
										<li class="nav-item"><a class="nav-link" href="#">Home</a></li>
										<li class="nav-item"><a class="nav-link" href="#">Foro</a></li>
										<li class="nav-item"><a class="btn btn-warning text-white ml-2" href="#">Join PetStar Now!</a></li>
										<li class="nav-item"><a class="nav-link" href="#">Log In</a></li>
										<li class="nav-item"><a class="btn btn-primary ml-2" href="#">Sign Up</a></li>
									</ul>
								</div>
							</div>
						</nav>
					</>
			}
		</div>

	);
};
