import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div class="hero-section">
				<h1>Connect with Pet Lovers</h1>
				<img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641293/bulldog-1047517_1280_azk18r.jpg" class="imagen-galeria"/>
					<div class="d-grid gap-2 col-6 mx-auto">
						<button type="button" class="btn btn-light col-6 mx-auto">Start Your Journey</button>
					</div>
			</div>

			
			<section class="gallery-section container">
				<h2 class="mb-4">Pet Gallery Highlights</h2>
				<p>Discover adorable moments</p>
				<div class="row">
					<div class="col-md-4"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/couple-5267726_1280_rtcucc.jpg" class="imagen-galeria"/></div>
					<div class="col-md-4"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-7174266_1280_jqdyom.jpg" class="imagen-galeria"/></div>
					<div class="col-md-4"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-5883275_1280_xcefwt.jpg" class="imagen-galeria"/></div>
					<div class="col-md-4"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-785193_1280_1_hy2uvp.jpg" class="imagen-galeria"/></div>
					<div class="col-md-4"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/pets-3715734_1280_zut83f.jpg" class="imagen-galeria"/></div>
					<div class="col-md-4"><img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/corgi-4415649_1280_cwjacb.jpg" class="imagen-galeria"/></div>
				</div>
			</section>

			<section class="testimonials">
				<h2>What Our Users Say</h2>
				<div class="container">
					<div class="row mt-4">
						<div class="col-md-4">
							<div class="card p-3">
								<p>“PetStar has changed my life! I found my best friend here.”</p>
								<small>— Emily Johnson, Pet Enthusiast</small>
							</div>
						</div>
						<div class="col-md-4">
							<div class="card p-3">
								<p>“The community is so supportive and fun!”</p>
								<small>— Mark Smith, Proud Pet Owner</small>
							</div>
						</div>
						<div class="col-md-4">
							<div class="card p-3">
								<p>“I love sharing my pet's adventures with others!”</p>
								<small>— Sarah Lee, Animal Advocate</small>
							</div>
						</div>
					</div>
				</div>
			</section>

			
			<section class="features">
				<div class="container">
					<h2>Why Choose PetStar?</h2>
					<div class="row mt-4">
						<div class="col-md-4">
							<img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/dog-4633734_1280_pgyasv.jpg" class="mb-3 imagen-galeria"/>
								<h5>Connect with Pet Lovers</h5>
								<p>Join a vibrant community of pet enthusiasts.</p>
						</div>
						<div class="col-md-4">
							<img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/shepherd-dog-4357790_1280_n55hd7.jpg" class="mb-3 imagen-galeria"/>
								<h5>Engaging Content</h5>
								<p>Share and discover posts about pets, from photos to stories.</p>
						</div>
						<div class="col-md-4">
							<img src="https://res.cloudinary.com/dyvut6idr/image/upload/v1725641292/animal-4085255_1280_hdbrcc.jpg" class="mb-3 imagen-galeria"/>
								<h5>Thematic Groups</h5>
								<p>Join discussions on breeds, health, and more.</p>
						</div>
					</div>
				</div>
			</section>

		</div>
	);
};
