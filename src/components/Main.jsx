import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesAPI, getProfilesAPI } from "../action";
import PostalModal from "./PostalModal";
import Article from "./Article";

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

const Content = styled.div`
	text-align: center;
	& > img {
		width: 30px;
	}
`;

function Main(props) {
	const [showModal, setShowModal] = useState("close");

	useEffect(() => {
		props.getArticles();
		props.getProfiles();
	}, []);

	const clickHandler = (event) => {
		event.preventDefault();
		if (event.target !== event.currentTarget) {
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
						<img src="/images/photo-icon.svg" alt="" />
						<span>Photo</span>
					</button>
					<button>
						<img src="/images/video-icon.svg" alt="" />
						<span>Video</span>
					</button>
					<button>
						<img src="/images/event-icon.svg" alt="" />
						<span>Event</span>
					</button>
					<button>
						<img src="/images/article-icon.svg" alt="" />
						<span>Write article</span>
					</button>
				</div>
			</ShareBox>
			<Content>
				{props.loading && <img src="/images/spin-loader.gif" alt="" />}
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
