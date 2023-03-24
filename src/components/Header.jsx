import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signInAPI, signOutAPI } from "../action";

const Container = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	/* width: 100vw; */
	z-index: 10;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	margin: 0 auto;
	height: 100%;
	max-width: 1128px;
`;

const Logo = styled.span`
	margin-right: 8px;
	font-size: 0;
`;

const Search = styled.div`
	opacity: 1;
	flex-grow: 1;
	position: relative;
	@media (max-width: 768px) {
		flex-grow: unset;
	}
	& > div {
		max-width: 280px;
		input {
			border: none;
			box-shadow: none;
			background-color: #eef3f8;
			border-radius: 2px;
			color: rgba(0, 0, 0, 0.9);
			width: 218px;
			padding: 0 8px 0 40px;
			line-height: 1.75;
			font-weight: 400;
			font-size: 14px;
			height: 34px;
			vertical-align: text-top;
			border-color: #dce6f1;
			@media (max-width: 768px) {
				width: 140px;
			}
		}
	}
`;

const SearchIcon = styled.div`
	width: 40px;
	z-index: 1;
	position: absolute;
	top: 10px;
	left: 5px;
	border-radius: 0 2px 2px 0;
	margin: 0;
	pointer-events: none;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Nav = styled.nav`
	margin-left: auto;
	display: block;
	@media (max-width: 768px) {
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		width: 100%;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: space-between;
	.active {
		span::after {
			content: "";
			transform: scaleX(1);
			border-bottom: 2px solid var(--white, #fff);
			position: absolute;
			left: 0;
			bottom: 0;
			transition: transform 0.2s ease-in-out;
			width: 100%;
			border-color: rgba(0, 0, 0, 0.9);
		}
	}
`;

const NavList = styled.li`
	display: flex;
	align-items: center;
	a {
		align-items: center;
		background: transparent;
		display: flex;
		flex-direction: column;
		font-size: 12px;
		font-weight: 400;
		justify-content: center;
		line-height: 1.5;
		min-height: 52px;
		min-width: 80px;
		position: relative;
		text-decoration: none;
		span {
			color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			text-align: center;
		}
		@media (max-width: 768px) {
			min-width: 50px;
			font-size: 9px;
			span > img {
				width: 40%;
			}
		}
	}
	&:hover,
	&:active {
		a {
			span {
				color: rgba(0, 0, 0, 0.9);
			}
		}
	}
`;

const SignOutContainer = styled.div`
	position: absolute;
	top: 45px;
	background: white;
	border-radius: 0 0 5px 5px;
	font-size: 16px;
	transition-duration: 167ms;
	display: none;
	z-index: 15;
	border: 1px solid #dce6f1;
`;

const SignOut = styled.div`
	padding-top: 20px;
	background: white;
	border-radius: 0 0 5px 5px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	text-align: center;
`;

const SignIn = styled.div`
	padding-top: 10px;
	background: white;
	border-radius: 0 0 5px 5px;
	width: 100px;
	height: 40px;
	font-size: 16px;
	text-align: center;
`;

const SignOutMobile = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		padding-left: 1rem;
		font-size: 14px;
	}
`;

const User = styled(NavList)`
	a > img {
		border-radius: 50%;
		width: 25px;
		height: 25px;
	}
	span {
		display: flex;
		align-items: center;
	}
	&:hover {
		${SignOutContainer} {
			@media (min-width: 768px) {
				display: inline-block;
				align-items: center;
				justify-content: center;
			}
		}
	}
`;

const Work = styled(User)`
	border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const Form = styled.form`
	padding: 10px 10px 0px 10px;
`;

const handleSubmit = (event, signInMethod) => {
	event.preventDefault();
	signInMethod(event.target.email.value, event.target.password.value);
}	

const AdminSignInForm = ({signInMethod}) => {
	return (
		<Form className="form" onSubmit={(event) => handleSubmit(event, signInMethod)}>
			<div className="input-group">
				<label htmlFor="email">Email</label>
				<input style={{display: "block"}} type="email" name="email" />
			</div>
			<div className="input-group">
				<label htmlFor="password">Password</label>
				<input  style={{display: "block"}} type="password" name="password" />
			</div>
			<SignIn><button className="primary">Sign In</button></SignIn>
		</Form>
	)
}

function Header(props) {
	const adminIsSignedIn = props.user?.email === "ceo@linkedout.company";
	return (
		<Container>
			<Content>
				<Logo>
					<a href="/feed">
						<img src="/images/linkedoutsmall.png" alt="" height="40" />
					</a>
				</Logo>
				<Search>
					<div>
						<input type="text" placeholder="Search" />
					</div>
					<SearchIcon>
						<img src="/images/search-icon.svg" alt="" />
					</SearchIcon>
				</Search>
				<SignOutMobile onClick={() => props.signOut()}>
					<a>Admin Sign In</a>
				</SignOutMobile>
				<Nav>
					<NavListWrap>
						<NavList className="active">
							<a href="/feed">
								<img src="/images/nav-home.svg" alt="" />
								<span>Home</span>
							</a>
						</NavList>
						<NavList>
							<a href="/feed">
								<img src="/images/nav-network.svg" alt="" />
								<span>My Network</span>
							</a>
						</NavList>
						<NavList>
							<a href="/feed">
								<img src="/images/nav-jobs.svg" alt="" />
								<span>Jobs</span>
							</a>
						</NavList>
						<NavList>
							<a href="/feed">
								<img src="/images/nav-messaging.svg" alt="" />
								<span>Messaging</span>
							</a>
						</NavList>
						<NavList>
							<a href="/feed">
								<img src="/images/nav-notifications.svg" alt="" />
								<span>Notifications</span>
							</a>
						</NavList>
						<User>
							<a>
								{props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
								<span>
									Me <img src="/images/down-icon.svg" alt="" />
								</span>
							</a>
							<SignOutContainer>
								{adminIsSignedIn ? (
								<SignOut>
									<button onClick={() => props.signOut()}>Sign Out</button>
								</SignOut> 
								): (
								<AdminSignInForm signInMethod={props.adminSignIn}/>
								) }
							</SignOutContainer>
						</User>
						<Work>
							<a>
								<img src="/images/nav-work.svg" alt="" />
								<span>
									Work <img src="/images/down-icon.svg" alt="" />
								</span>
							</a>
						</Work>
					</NavListWrap>
				</Nav>
			</Content>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

const mapDispatchToProps = (dispatch) => ({
	adminSignIn: (email, password) => dispatch(signInAPI(email, password)),
	signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
