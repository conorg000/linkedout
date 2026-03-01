import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI, getProfilesAPI } from "../action";
import PostalModal from "./PostalModal";
import Article from "./Article";
import { analytics } from "../firebase";

const Container = styled.div`
	grid-area: main;
`;

const CommonBox = styled.div`
	text-align: center;
	overflow: hidden;
	margin-bottom: 8px;
	background-color: #fff;
	border-radius: 5px;
	position: relative;
	border: none;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonBox)`
	display: flex;
	flex-direction: column;
	margin: 0 0 8px;
	color: #958b7b;
	div {
		button {
			outline: none;
			color: rgba(0, 0, 0, 0.6);
			font-size: 14px;
			line-height: 1.5;
			min-height: 48px;
			display: flex;
			align-items: center;
			border: none;
			background-color: transparent;
			font-weight: 600;
		}
		&:first-child {
			display: flex;
			align-items: center;
			padding: 8px 16px;
			img {
				width: 48px;
				border-radius: 50%;
				margin-right: 8px;
			}
			button {
				margin: 4px 0;
				flex-grow: 1;
				padding-left: 16px;
				border: 1px solid rgba(0, 0, 0, 0.15);
				border-radius: 35px;
				text-align: left;
			}
		}
		&:nth-child(2) {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding-bottom: 4px;
			button {
				img {
					margin: 0 4px 0 -2px;
				}
			}
		}
	}
`;

const SortBar = styled.div`
	display: flex;
	align-items: center;
	margin: 8px 0;
	hr {
		flex-grow: 1;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.15);
	}
	span {
		font-size: 12px;
		color: rgba(0, 0, 0, 0.6);
		margin-left: 8px;
		white-space: nowrap;
		display: flex;
		align-items: center;
		cursor: pointer;
		strong {
			color: rgba(0, 0, 0, 0.9);
			margin-left: 4px;
		}
	}
`;

const Content = styled.div`
	text-align: center;
	& > img {
		width: 30px;
	}
`;

const shimmer = `
	@keyframes shimmer {
		0% { background-position: -600px 0; }
		100% { background-position: 600px 0; }
	}
`;

const SkeletonCard = styled.div`
	background: #fff;
	border-radius: 5px;
	box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
	margin-bottom: 8px;
	padding: 16px;

	.skeleton-line {
		background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
		background-size: 1200px 100%;
		animation: shimmer 1.4s infinite linear;
		border-radius: 4px;
	}

	@keyframes shimmer {
		0% { background-position: -600px 0; }
		100% { background-position: 600px 0; }
	}

	.sk-header {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 12px;
	}
	.sk-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.sk-name {
		height: 12px;
		width: 120px;
		margin-bottom: 6px;
	}
	.sk-headline {
		height: 10px;
		width: 180px;
	}
	.sk-body-line {
		height: 10px;
		margin-bottom: 8px;
		&:last-child { width: 70%; margin-bottom: 0; }
	}
	.sk-footer {
		display: flex;
		gap: 8px;
		margin-top: 12px;
		padding-top: 12px;
		border-top: 1px solid rgba(0,0,0,0.08);
	}
	.sk-action {
		height: 10px;
		flex: 1;
	}
`;

function Main(props) {
	const [showModal, setShowModal] = useState("close");
	const adminIsSignedIn = props.user?.email === "ceo@linkedout.company";

	useEffect(() => {
		props.getArticles();
		props.getProfiles();
		analytics.logEvent("main_page_loaded");
	}, []);

	const clickHandler = (event) => {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
			return;
		}
		if(!adminIsSignedIn){
			return;
		}
		switch (showModal) {
			case "open":
				setShowModal("close");
				break;
			case "close":
				setShowModal("open");
				break;
			default:
				setShowModal("close");
				break;
		}
	};

	return (
		<Container>
			<ShareBox>
				<div>
					{props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
					<button onClick={clickHandler} disabled={props.loading ? true : false}>
						Start a post
					</button>
				</div>
				<div>
					<button>
						<img src="/images/video-icon.svg" alt="" />
						<span>Video</span>
					</button>
					<button>
						<img src="/images/photo-icon.svg" alt="" />
						<span>Photo</span>
					</button>
					<button>
						<img src="/images/article-icon.svg" alt="" />
						<span>Write article</span>
					</button>
				</div>
			</ShareBox>
			<SortBar>
				<hr />
				<span>Sort by: <strong>Top</strong> ▾</span>
			</SortBar>
			<Content>
				{props.loading && props.articles.length === 0 && [0, 1, 2].map((i) => (
					<SkeletonCard key={i}>
						<div className="sk-header">
							<div className="skeleton-line sk-avatar" />
							<div>
								<div className="skeleton-line sk-name" />
								<div className="skeleton-line sk-headline" />
							</div>
						</div>
						<div className="skeleton-line sk-body-line" />
						<div className="skeleton-line sk-body-line" />
						<div className="skeleton-line sk-body-line" />
						<div className="sk-footer">
							<div className="skeleton-line sk-action" />
							<div className="skeleton-line sk-action" />
							<div className="skeleton-line sk-action" />
							<div className="skeleton-line sk-action" />
						</div>
					</SkeletonCard>
				))}
				{props.articles.length > 0 &&
					props.articles.map((article, key) => (
						<Article key={key} article={article} user={props.user} articleId={props.ids[key]} />
					))}
			</Content>
			<PostalModal showModal={showModal} clickHandler={clickHandler} />
		</Container>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.userState.user,
		loading: state.articleState.loading,
		articles: state.articleState.articles,
		ids: state.articleState.ids,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getArticles: () => dispatch(getArticlesAPI()),
	getProfiles: () => dispatch(getProfilesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
