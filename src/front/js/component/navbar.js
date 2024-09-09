import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg navbar-light">
			<div class="container">
				<a class="navbar-brand" href="#"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725640842/Logo_PetStar-removebg-preview_oo91wx.png" alt="PetStar" height="40"/></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav mx-auto">
						<li class="nav-item"><a class="nav-link" href="#">Home</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Foro</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Search</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Services</a></li>
						<li class="nav-item"><a class="btn btn-primary ml-2" href="#">Log out</a></li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
