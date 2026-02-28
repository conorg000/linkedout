import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
	grid-area: left;
	position: sticky;
	top: 60px;
	align-self: start;
	max-height: calc(100vh - 68px);
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 0;
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const ArtCard = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	border-radius: 5px;
	background-color: #fff;
	transition: box-shadow 83ms;
	position: relative;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	padding: 12px 12px 16px;
	word-wrap: break-word;
	word-break: break-word;
`;

const CardBackground = styled.div`
	background: url("/images/card-bg.svg");
	background-position: center;
	background-size: 462px;
	height: 54px;
	margin: -12px -12px 0;
`;

const Photo = styled.div`
	box-shadow: none;
	background: url(${props => props.photoUrl});
	background-size: 72px 72px;
	width: 72px;
	height: 72px;
	box-sizing: border-box;
	background-clip: content-box;
	background-color: #fff;
	background-position: center;
	background-repeat: no-repeat;
	border: 2px solid white;
	margin: -38px auto 12px;
	border-radius: 50%;
`;

const NameLink = styled.div`
	font-size: 16px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	font-weight: 600;
`;

const Headline = styled.div`
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	margin-top: 2px;
`;

const AddPhotoText = styled.div`
	color: #0a66c2;
	margin-top: 4px;
	font-size: 12px;
	line-height: 1.33;
	font-weight: 400;
`;

const Widget = styled.div`
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	padding: 12px 0;
	& > a {
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 4px 12px;
		cursor: pointer;
		&:hover {
			background-color: rgba(0, 0, 0, 0.08);
		}
		div {
			display: flex;
			flex-direction: column;
			text-align: left;
			span {
				font-size: 12px;
				line-height: 1.333;
				&:first-child {
					color: rgba(0, 0, 0, 0.6);
				}
				&:nth-child(2) {
					color: rgba(0, 0, 0, 0.9);
					font-weight: 600;
				}
			}
		}
	}
`;

const ViewerCount = styled.span`
	color: #0a66c2;
	font-weight: 600;
`;

const Item = styled.a`
	display: block;
	border-color: rgba(0, 0, 0, 0.6);
	text-align: left;
	padding: 12px;
	font-size: 12px;
	cursor: pointer;
	span {
		display: flex;
		align-items: center;
	}
	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}
`;

const PremiumPromo = styled.a`
	display: block;
	padding: 12px;
	font-size: 12px;
	color: rgba(0, 0, 0, 0.6);
	cursor: pointer;
	border-top: 1px solid rgba(0, 0, 0, 0.15);
	&:hover {
		background-color: rgba(0, 0, 0, 0.08);
	}
	span {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	strong {
		color: #915907;
	}
`;

const CommunityCard = styled(ArtCard)`
	padding: 8px 0 0;
	text-align: left;
	display: flex;
	flex-direction: column;
	a {
		color: #000;
		padding: 4px 12px;
		font-size: 12px;
		cursor: pointer;
		&:hover {
			color: #0a66c2;
		}
		span {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&:last-child {
			color: rgba(0, 0, 0, 0.6);
			border-top: 1px solid #d6cec2;
			padding: 12px;
			&:hover {
				background-color: rgba(0, 0, 0, 0.08);
			}
		}
	}
`;

function Left(props) {
	let photoUrl = props.user.photoURL ? props.user.photoURL : "/images/photo.svg";
	return (
		<Container>
			<ArtCard>
				<UserInfo>
					<CardBackground />
					<a>
						<Photo photoUrl={photoUrl} />
						<NameLink>Welcome, {props.user ? props.user.displayName : "there"}!</NameLink>
						<Headline>Disrupting the disruption industry</Headline>
					</a>
					<a>
						<AddPhotoText>Add a photo</AddPhotoText>
					</a>
				</UserInfo>
				<Widget>
					<a>
						<div>
							<span>Profile viewers</span>
							<span>36</span>
						</div>
						<ViewerCount>View all analytics</ViewerCount>
					</a>
				</Widget>
				<Widget>
					<a>
						<div>
							<span>Connections</span>
							<span>Grow Your Network</span>
						</div>
						<img src="/images/widget-icon.svg" alt="" />
					</a>
				</Widget>
				<Item>
					<span>
						<img src="/images/item-icon.svg" alt="" />
						My Items
					</span>
				</Item>
				<PremiumPromo>
					<span>
						<strong>Grow your career with Premium</strong>
					</span>
				</PremiumPromo>
			</ArtCard>
			<CommunityCard>
				<a>
					<span>Groups</span>
				</a>
				<a>
					<span>
						Events
						<img src="/images/plus-icon.svg" alt="" />
					</span>
				</a>
				<a>
					<span>Follow Hashtags</span>
				</a>
				<a>
					<span>Newsletters</span>
				</a>
				<a>
					<span>Discover More</span>
				</a>
			</CommunityCard>
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
	};
};

export default connect(mapStateToProps)(Left);
