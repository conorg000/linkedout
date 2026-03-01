import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { signInAPI, signOutAPI } from "../action";

const Container = styled.div`
	background-color: #fff;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	padding: 0 24px;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 10;
	@media (max-width: 768px) {
		padding: 0 12px;
	}
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
	a {
		display: flex;
	}
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
		display: none;
	}
`;

const NavListWrap = styled.ul`
	display: flex;
	flex-wrap: nowrap;
	list-style-type: none;
	justify-content: space-between;
	overflow: visible;
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
		cursor: pointer;
		span {
			color: rgba(0, 0, 0, 0.6);
			display: flex;
			align-items: center;
			text-align: center;
		}
	}
	a:hover,
	a:visited {
		text-decoration: none;
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

const BadgeContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Badge = styled.span`
	position: absolute;
	top: -8px;
	right: -10px;
	background: #cc1016;
	color: #fff !important;
	font-size: 10px;
	font-weight: 600;
	min-width: 16px;
	height: 16px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 5px;
	line-height: 1;
	border: 2px solid #fff;
	box-sizing: content-box;
`;

const SignOutContainer = styled.div`
	position: absolute;
	top: 52px;
	right: 0;
	background: white;
	border-radius: 0 0 8px 8px;
	font-size: 14px;
	transition-duration: 167ms;
	display: none;
	z-index: 15;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 6px 9px rgb(0 0 0 / 20%);
	width: 240px;
	max-height: calc(100vh - 60px);
	overflow-y: auto;
`;

const MeDropdownContent = styled.div`
	padding: 0;
	a, button {
		display: block !important;
		min-height: unset !important;
		min-width: unset !important;
		flex-direction: unset !important;
		justify-content: unset !important;
		align-items: unset !important;
	}
`;

const ProfileCard = styled.div`
	padding: 12px 16px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	display: flex;
	align-items: center;
	gap: 12px;
	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
	}
	div {
		overflow: hidden;
		h4 {
			font-size: 16px;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.9);
			line-height: 1.3;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		p {
			font-size: 12px;
			color: rgba(0, 0, 0, 0.6);
			line-height: 1.4;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
`;

const ViewProfileButton = styled(Link)`
	display: block;
	margin: 8px 16px;
	padding: 5px 0;
	border: 1px solid #0a66c2;
	border-radius: 16px;
	color: #0a66c2 !important;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
	text-decoration: none !important;
	line-height: 1.4;
	&:hover {
		background: rgba(112, 181, 249, 0.15);
		border-color: #004182;
	}
`;

const DropdownSection = styled.div`
	padding: 8px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	&:last-child {
		border-bottom: none;
	}
	h5 {
		font-size: 12px;
		font-weight: 600;
		color: rgba(0, 0, 0, 0.9);
		padding: 0 16px 4px;
	}
	a, button {
		display: block;
		width: 100%;
		padding: 6px 16px;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.6);
		text-decoration: none;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		line-height: 1.4;
		box-sizing: border-box;
		&:hover {
			background: rgba(0, 0, 0, 0.08);
			text-decoration: none;
		}
	}
`;

const SignIn = styled.div`
	margin-top: 4px;
	button {
		width: 100%;
		padding: 5px 0;
		background: #0a66c2;
		color: #fff !important;
		border: none;
		border-radius: 16px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		line-height: 1.4;
		text-align: center !important;
		&:hover {
			background: #004182;
		}
	}
`;

const User = styled(NavList)`
	position: relative;
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
				display: block;
			}
		}
	}
`;

const Work = styled(User)`
	border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const PremiumLink = styled(NavList)`
	a {
		color: #915907;
		font-size: 12px;
		min-width: auto;
		padding: 0 8px;
		text-decoration: underline;
		span {
			color: #915907;
		}
	}
	@media (max-width: 960px) {
		display: none;
	}
`;

const Form = styled.form`
	padding: 0 16px 4px;
	input {
		display: block;
		width: 100%;
		padding: 4px 8px;
		height: 28px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		font-size: 14px;
		margin-bottom: 6px;
		box-sizing: border-box;
		&:focus {
			outline: none;
			border-color: #0a66c2;
		}
	}
`;

const MobileNav = styled.nav`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		z-index: 10;
		justify-content: space-around;
		align-items: center;
		height: 52px;
		padding-bottom: env(safe-area-inset-bottom, 0);
	}
`;

const MobileNavItem = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	font-size: 10px;
	color: ${props => props.$active ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.6)"};
	min-width: 50px;
	padding: 6px 0;
	position: relative;
	img {
		width: 24px;
		height: 24px;
		opacity: ${props => props.$active ? 1 : 0.6};
	}
	span {
		margin-top: 2px;
	}
	&::after {
		content: "";
		display: ${props => props.$active ? "block" : "none"};
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 2px;
		background: rgba(0,0,0,0.9);
	}
`;

const MobilePostButton = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: none;
	border: none;
	font-size: 10px;
	color: rgba(0,0,0,0.6);
	min-width: 50px;
	padding: 6px 0;
	cursor: pointer;
`;

const PostIcon = styled.div`
	width: 24px;
	height: 24px;
	border-radius: 4px;
	border: 2px solid rgba(0,0,0,0.6);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	line-height: 1;
	color: rgba(0,0,0,0.6);
`;

const handleSubmit = (event, signInMethod) => {
	event.preventDefault();
	signInMethod(event.target.email.value, event.target.password.value);
};

const AdminSignInForm = ({ signInMethod }) => {
	return (
		<Form className="form" onSubmit={(event) => handleSubmit(event, signInMethod)}>
			<input type="email" name="email" placeholder="Email" />
			<input type="password" name="password" placeholder="Password" />
			<SignIn>
				<button className="primary">Sign In</button>
			</SignIn>
		</Form>
	);
};

function Header(props) {
	const adminIsSignedIn = props.user?.email === "ceo@linkedout.company";
	const location = useLocation();
	const currentPath = location.pathname;

	const isActive = (path) => {
		if (path === "/feed") return currentPath === "/feed" || currentPath === "/";
		return currentPath.startsWith(path);
	};

	return (
		<>
			<Container>
				<Content>
					<Logo>
						<Link to="/feed">
							<img src="/images/linkedoutsmall.png" alt="" height="40" />
						</Link>
					</Logo>
					<Search>
						<div>
							<input type="text" placeholder="Search" />
						</div>
						<SearchIcon>
							<img src="/images/search-icon.svg" alt="" />
						</SearchIcon>
					</Search>
					<Nav>
						<NavListWrap>
							<NavList className={isActive("/feed") ? "active" : ""}>
								<Link to="/feed">
									<img src="/images/nav-home.svg" alt="" />
									<span>Home</span>
								</Link>
							</NavList>
							<NavList className={isActive("/mynetwork") ? "active" : ""}>
								<Link to="/mynetwork">
									<img src="/images/nav-network.svg" alt="" />
									<span>My Network</span>
								</Link>
							</NavList>
							<NavList className={isActive("/jobs") ? "active" : ""}>
								<Link to="/jobs">
									<img src="/images/nav-jobs.svg" alt="" />
									<span>Jobs</span>
								</Link>
							</NavList>
							<NavList className={isActive("/messaging") ? "active" : ""}>
								<Link to="/messaging">
									<BadgeContainer>
										<img src="/images/nav-messaging.svg" alt="" />
										<Badge>7</Badge>
									</BadgeContainer>
									<span>Messaging</span>
								</Link>
							</NavList>
							<NavList className={isActive("/notifications") ? "active" : ""}>
								<Link to="/notifications">
									<BadgeContainer>
										<img src="/images/nav-notifications.svg" alt="" />
										<Badge>14</Badge>
									</BadgeContainer>
									<span>Notifications</span>
								</Link>
							</NavList>
							<User>
								<a>
									{props.user && props.user.photoURL ? (
										<img src={props.user.photoURL} alt="" />
									) : (
										<img src="/images/user.svg" alt="" />
									)}
									<span>
										Me <img src="/images/down-icon.svg" alt="" />
									</span>
								</a>
								<SignOutContainer>
									<MeDropdownContent>
										<ProfileCard>
											<img src={props.user?.photoURL || "/images/user.svg"} alt="" />
											<div>
												<h4>{props.user?.displayName || "Harold"}</h4>
												<p>Disrupting the disruption industry</p>
											</div>
										</ProfileCard>
										<ViewProfileButton to="/profile/admin">View Profile</ViewProfileButton>
										<DropdownSection>
											{adminIsSignedIn ? (
												<button onClick={() => props.signOut()}>Sign Out</button>
											) : (
												<AdminSignInForm signInMethod={props.adminSignIn} />
											)}
										</DropdownSection>
										<DropdownSection>
											<h5>Account</h5>
											<a href="#">Try 1 month of Premium for A$0</a>
											<a href="#">Settings & Privacy</a>
											<a href="#">Help</a>
											<a href="#">Language</a>
										</DropdownSection>
										<DropdownSection>
											<h5>Manage</h5>
											<a href="#">Posts & Activity</a>
											<a href="#">Job Posting Account</a>
										</DropdownSection>
									</MeDropdownContent>
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
							<PremiumLink>
								<a href="#">
									<span>Try Premium</span>
								</a>
							</PremiumLink>
						</NavListWrap>
					</Nav>
				</Content>
			</Container>
			<MobileNav>
				<MobileNavItem to="/feed" $active={isActive("/feed")}>
					<img src="/images/nav-home.svg" alt="" />
					<span>Home</span>
				</MobileNavItem>
				<MobileNavItem to="/mynetwork" $active={isActive("/mynetwork")}>
					<img src="/images/nav-network.svg" alt="" />
					<span>My Network</span>
				</MobileNavItem>
				<MobilePostButton>
					<PostIcon>+</PostIcon>
					<span>Post</span>
				</MobilePostButton>
				<MobileNavItem to="/notifications" $active={isActive("/notifications")}>
					<img src="/images/nav-notifications.svg" alt="" />
					<span>Notifications</span>
				</MobileNavItem>
				<MobileNavItem to="/jobs" $active={isActive("/jobs")}>
					<img src="/images/nav-jobs.svg" alt="" />
					<span>Jobs</span>
				</MobileNavItem>
			</MobileNav>
		</>
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
